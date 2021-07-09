const inquire = require("./inquirer");
const appAsks = require("../questions/questions");
const fs = require("fs");

// // Moved the extra step functions needed to complete the high level actions to this file
const Command = require("./commands");
const commands = new Command();

function CommandCenter() {
  /*
  Current book search for both the Title or Author
  */
  this.bookTitleSearch = async () => {
    let bookSelectionArr = [];
    let startingIndex = 0;
    let userInput;
    let bookFound;
    let finalBook;

    // sets true or false based on User input to check later
    const isValidInput = await inquire(appAsks("searchBookByTitle")).then(async (title) => {
      userInput = title.search;
      return await commands.bookSearchInputCheck(title.search);
    });

    if (isValidInput) {
      // Fetch Call
      bookFound = await commands.fetchAndSelect(userInput, startingIndex, bookSelectionArr);
    } else {
      console.log(
        "\n\n--------------" +
          "\n\nPlease correctly write the full title of the book or a snippet of the Title" +
          "\n\n--------------\n\n\n"
      );
      return this.bookTitleSearch();
    }

    finalBook = await commands.selectionFilterAndFormat(bookSelectionArr);

    // Save the book they picked
    await commands.bookSave(finalBook);
  };
}

module.exports = CommandCenter;
