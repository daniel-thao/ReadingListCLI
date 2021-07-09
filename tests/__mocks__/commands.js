// const axios = require("axios");
// const fs = require("fs");

const iMockFn = require("../__mocks__/inquirer");
const appQuestions = require("../../questions/questions");

function Command() {
  /*
  recursive function to house the fetch call and other things
  */
  this.fetchAndSelect = async (
    userInput,
    startIndex,
    bookSelectionArr,
    userTestChoice,
    recursiveCount
  ) => {
    // count here to emulate when the user chooses a book after recursing the inquire question
    let count = 0;
    if (count > recursiveCount[0]) {
      console.log("this happened");
      userTestChoice = recursiveCount[1];
    }

    // Actual fetch call
    searchResults = await this.bookSearchFetch(
      userInput.split(" "),
      startIndex
    );
    // Follow up question to select one book from fetch results, or keep looking
    await iMockFn(
      appQuestions("selectBook", searchResults),
      searchResults[userTestChoice]
    ).then(async (bookList) => {
      if (bookList.bookChosen === ".....Next Page Results\n") {
        bookSelectionArr.push("Next Page");
        startIndex += 5;
        count++;
        await this.fetchAndSelect(
          userInput,
          startIndex,
          bookSelectionArr,
          userTestChoice,
          recursiveCount
        );
      } else {
        // everything from .split() is for formatting purposes
        return bookSelectionArr.push(
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
      `Title: ${
        userInput.join(" ") + " " + startingIndex
      }\nAuthor: "fake"\nPublisher: "null"\n`,
      `Title: ${
        userInput.join(" ") + " " + (startingIndex + 1)
      }\nAuthor: "fake"\nPublisher: "null"\n`,
      `Title: ${
        userInput.join(" ") + " " + (startingIndex + 2)
      }\nAuthor: "fake"\nPublisher: "null"\n`,
      `Title: ${
        userInput.join(" ") + " " + (startingIndex + 3)
      }\nAuthor: "fake"\nPublisher: "null"\n`,
      `Title: ${
        userInput.join(" ") + " " + (startingIndex + 4)
      }\nAuthor: "fake"\nPublisher: "null"\n`,
      ".....Next Page Results\n",
    ];
  };
}


module.exports = Command;

const Commands = require('./commands');
const mockCommands = new Commands();