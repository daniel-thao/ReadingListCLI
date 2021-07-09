const axios = require("axios");
const fs = require("fs");
const inquire = require("./inquirer");
const appAsks = require("../questions/questions");

function Command() {
  /*
  Checks the user's Input to see if it's a valid search topic
  */
  this.bookSearchInputCheck = async (userInput) => {
    let isValid = false;
    let specialCharArr = ["*", "^", "&", "+", "-", "$", "(", ")", "#", "%", "="];

    if (typeof userInput !== "string" || userInput.trim() === "" || userInput === null || userInput === undefined) {
      return (isValid = false);
    } else isValid = true;

    for (let i = 0; i < specialCharArr.length; i++) {
      if (userInput.trim().includes(specialCharArr[i])) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  /*
  Calls the google API
  */
  this.bookSearchFetch = async (userInput, startingIndex) => {
    // format the search terms to be how Google likes it
    const searchTerms = userInput.join("+");

    const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&maxResults=5&startIndex=${startingIndex}`;

    // Fetch call
    return await axios.get(queryURL).then(async (res) => {
      // Show current page's titles and authors and add a last option to click the next page
      const resTitleAndAuthors = res.data.items.map(
        (index) =>
          `Title: ${index.volumeInfo.title}\nAuthor: ${index.volumeInfo.authors}\nPublisher: ${index.volumeInfo.publisher}\n`
      );
      resTitleAndAuthors.push(".....Next Page Results\n");
      return resTitleAndAuthors;
    });
  };

  /*
  recursive function to house the fetch call and other things
  */
  this.fetchAndSelect = async (userInput, startIndex, bookSelectionArr) => {
    searchResults = await this.bookSearchFetch(userInput.split(" "), startIndex);

    // Follow up question to select one book from fetch results, or keep looking
    await inquire(appAsks("selectBook", searchResults)).then(async (bookList) => {
      if (bookList.bookChosen === ".....Next Page Results\n") {
        bookSelectionArr.push("Next Page");
        startIndex += 5;
        await this.fetchAndSelect(userInput, startIndex, bookSelectionArr);
      } else {
        // everything from .split() is for formatting purposes
        bookSelectionArr.push(
          bookList.bookChosen
            .split("\n")
            .join("///")
            .substring(0, bookList.bookChosen.length + 3)
        );
      }
    });
  };

  /*
  Format the selection array to one item
  */
  this.selectionFilterAndFormat = async (bookSelectionArr) => {
    // Filter out weird atrifacts from recursion of inqurier prompt after user has chosen their book
    const actualBook = bookSelectionArr.filter((element) => element !== "Next Page");

    // format the data from elements in an array into key pair values in an object
    const bookObj = {};

    actualBook[0].split("///").forEach((element) => {
      const splitArrElements = element.split(": ");
      bookObj[splitArrElements[0]] = splitArrElements[1];
    });

    return bookObj;
  };

  /*
  Saves the Book to the readingList
  */
  this.bookSave = async (bookToSave) => {
    let amountOfBooks = 0;

    fs.readFile("./readingList.json", "UTF8", (err, data) => {
      if (err) {
        // If empty, write the file with the new data
        const firstBook = { 0: bookToSave };

        fs.writeFile("readingList.json", JSON.stringify(firstBook, null, 4), (err) => {
          if (err) {
            console.log("error here");
            throw err;
          }
          console.log("\nYou've added your first book!");
        });
      } else {
        // otherwise if it not empty
        try {
          JSON.parse(data);

          // otherwise grab the data and parse it
          const readingList = JSON.parse(data);

          // Check to see if the current book is already saved in your DB. If not there, increment num variable to be a number higher than all the keys in DB
          for (key in readingList) {
            if (
              readingList[key].Title === bookToSave.Title &&
              readingList[key].Author === bookToSave.Author &&
              readingList[key].Publisher === bookToSave.Publisher
            ) {
              return console.log("You already have this saved in your list.\n");
            } else {
              amountOfBooks++;
            }
          }

          // Then add it
          readingList[JSON.stringify(amountOfBooks)] = bookToSave;

          // Then rewrite the file with new data
          fs.writeFile("readingList.json", JSON.stringify(readingList, null, 4), (err) => {
            if (err) {
              throw err;
            } else {
              return console.log("Your new book has been added!\n");
            }
          });
        } catch {
          // If code above causes an error, go to the restoration process
          console.log(
            "\n\n--------------" +
              "\n\nThe current readinglist seems to corrupted." +
              "\nWe will attempt to restore the file to it's original state" +
              "\n\n--------------\n\n\n"
          );
          this.parseDB(data);
        }
      }
    });
  };

  /*
  Parse the data in the readingList file out in chunks
  */
  this.parseDB = async (dataGiven) => {
    // Separate each portion
    const testing = dataGiven.split("\n");
    // Store separate categories and manipulate later
    const directChildrenArr = [];
    const dirChildCloseArr = [];
    const childrensChildrenArr = [];
    const openCloseBracketArr = [];
    const regexExp = {
      numKVPRegex: /"[0-9]": [{ A-z0-9.:!@$#&',]/g,
      childrenKVPRegex: /"[A-z]*": "[A-z0-9.:!@$#&', ]*"/g,
      // cKVPCommaRegex: /"[A-z]*": "[A-z0-9.:!@$#&', ]*",/g,
      childBrackets: /},/g,
      openCloseBrackets: /[{}]/g,
    };

    // This separates all the items into array indexes
    for (let i = 0; i < testing.length; i++) {
      const trimmed = testing[i].trim();

      if (trimmed.match(regexExp.numKVPRegex) !== null) {
        directChildrenArr.push(trimmed.match(regexExp.numKVPRegex));
      } else if (trimmed.match(regexExp.childBrackets) !== null) {
        dirChildCloseArr.push(trimmed.match(regexExp.childBrackets));
      } else if (trimmed.match(regexExp.childrenKVPRegex) !== null) {
        childrensChildrenArr.push(trimmed.match(regexExp.childrenKVPRegex));
      } else if (trimmed.match(regexExp.childrenKVPRegex) !== null) {
        childrensChildrenArr.push(trimmed.match(regexExp.childrenKVPRegex));
      } else if (trimmed.match(regexExp.openCloseBrackets) !== null) {
        openCloseBracketArr.push(trimmed.match(regexExp.openCloseBrackets));
      }
    }

    // Once separated, try reconstructing the file with the correct JSON formatting
    this.reconstructDB(directChildrenArr, childrensChildrenArr, regexExp);
  };

  /*
  Reconstruct the data in JSON format
  */
  this.reconstructDB = async (levelOneKVPArr, levelTwoKVPArr, regexExp) => {
    let reconstructedString = ``;
    let cCArrStart = 0;

    reconstructedString += `{\n`;
    // Try building it, test to see if it can be parsed and if not, then give out UI error message
    try {
      for (let i = 0; i < levelOneKVPArr.length; i++) {
        let doesDestroy = false;
        // store all the aspects of the book objects
        let openingBracketNum = levelOneKVPArr[i] + `\n`;
        let reviewTitle = levelTwoKVPArr[cCArrStart][0];
        let reviewAuthor = levelTwoKVPArr[cCArrStart + 1][0];
        let reviewPub = levelTwoKVPArr[cCArrStart + 2][0];
        let closingBracketNum;

        for (let j = cCArrStart; j < cCArrStart + 3; j++) {
          // check if all the formatting is correct for the Title/Author/Pub KVP
          if (
            (reviewTitle.match(regexExp.cKVPCommaRegex) === null && j === cCArrStart) ||
            (reviewAuthor.match(regexExp.cKVPCommaRegex) === null && j === cCArrStart + 1) ||
            (reviewPub.match(regexExp.childrenKVPRegex) === null && j === cCArrStart + 2)
          ) {
            doesDestroy = true;
            break;
          }
        }

        // determines if we need a continuing closing bracket, or a finitive closing bracket
        if (i !== levelOneKVPArr.length - 1) {
          closingBracketNum = `},\n`;
        } else {
          closingBracketNum = `}`;
        }

        // If the data is restorable concatenate them together
        if (doesDestroy === false) {
          reconstructedString =
            reconstructedString +
            openingBracketNum +
            reviewTitle +
            ",\n" +
            reviewAuthor +
            ",\n" +
            reviewPub +
            "\n" +
            closingBracketNum;
        }

        cCArrStart += 3;
      }

      // final closing bracket
      reconstructedString += `}`;

      // Finally add redudancy another try clause to see if the string can be parsed
      try {
        const reconstructedJSON = JSON.parse(reconstructedString);
        this.restoreDB(reconstructedJSON);
      } catch (err) {
        console.log(
          "\n\n--------------" +
            "\n\nThe Database is too corrupted to restore currently, please delete the readinglist.json file." +
            "\n\nYou may copy and paste the titles the books to re-search for them at a later date." +
            "\n\nWe apologize for this inconvience at this current time" +
            "\n\n--------------\n\n\n"
        );
      }
    } catch {
      console.log(
        "\n\n--------------" +
          "\n\nThe Database is too corrupted to restore currently, please delete the readinglist.json file." +
          "\n\nYou may copy and paste the titles the books to re-search for them at a later date." +
          "\n\nWe apologize for this inconvience at this current time" +
          "\n\n--------------\n\n\n"
      );
    }
  };

  /*
  Rewrite the readingList JSON file with the reconstructed data
  */
  this.restoreDB = async (restorableData) => {
    fs.writeFile("readingList.json", JSON.stringify(restorableData, null, 4), (err) => {
      if (err) {
        console.log("error here");
        throw err;
      }
      console.log(
        "\n\n--------------" +
          "\n\nWe've restored the DB completely!" +
          "\n\nPlease reselect recontinue the option chosen earlier again" +
          "\n\n--------------\n\n\n"
      );
    });
  };
}

module.exports = Command;
