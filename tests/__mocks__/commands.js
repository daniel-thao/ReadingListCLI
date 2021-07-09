// const axios = require("axios");
// const fs = require("fs");

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
  recursive function to house the fetch call and other things
  */
  this.requestAndSelect = async (userInputResults, amountOfBooksLookedThrough) => {
    // Actual fetch call
    bookFound = await this.bookSearchFetch(userInputResults.split(" "), amountOfBooksLookedThrough);

    // Follow up question to select one book from fetch results, or keep looking
    await inquirer(appAsks("selectBook", bookFound)).then(async (bookList) => {
      if (bookList.bookChosen === ".....Next Page Results\n") {
        finalBook.push("Next Page");
        startingIndex = startingIndex + 5;
        await requestAndSelect(foundResult, startingIndex);
      } else {
        // everything from .split() is for formatting purposes
        return finalBook.push(
          bookList.bookChosen
            .split("\n")
            .join("///")
            .substring(0, bookList.bookChosen.length + 3)
        );
      }
    });
  };

  /*
  Calls the google API
  */
  this.bookSearchFetch = async (userInput, startingIndex) => {
    // format the search terms to be how Google likes it
    const searchTerms = userInput.join("+");

    const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&maxResults=5&startIndex=${startingIndex}`;

    // Fetch call with query above and returns with this
    return [
      { volumeInfo: { title: userInput.join(" ") + " " + startingIndex, authors: "fake", publisher: "null" } },
      { volumeInfo: { title: userInput.join(" ") + " " + (startingIndex + 1), authors: "fake", publisher: "null" } },
      { volumeInfo: { title: userInput.join(" ") + " " + (startingIndex + 2), authors: "fake", publisher: "null" } },
      { volumeInfo: { title: userInput.join(" ") + " " + (startingIndex + 3), authors: "fake", publisher: "null" } },
      { volumeInfo: { title: userInput.join(" ") + " " + (startingIndex + 4), authors: "fake", publisher: "null" } },
      ".....Next Page Results\n",
    ];
  };
}

module.exports = Command;
