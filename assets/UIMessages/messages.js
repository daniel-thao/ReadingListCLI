module.exports = message = {}

// Mutate the variable with methods
// Opening message if user types either yarn start || node index.js
message.entrance = () => console.log("\nWelcome to your personal book saving application!\n" +
    "Please type out your commands for me\n" +
    "\nCommands\n" +
    "-------------" +
    "\nSearching - Search for a book from Google through its title\n" +
    "   Examples: yarn start Search Lord of the Rings\n" +
    "             node index.js search Lord Rings\n" +
    "\nView - View your current reading list\n" +
    "\nRecent - View your recent searches that we're stored\n" +
    "\nAdd - Add one of the books you recently searched into your reading list. Books indicated by numbers and range from 0-4\n" +
    "   Examples: yarn start Add 0\n" +
    "             node index.js Add 4\n");

// Success message on completing the search command
message.search = (bookObj) => {
    console.log(bookObj);
    return console.log("\n--------------------\n" +
        "\nYour searches have been added your recents temporary storage!\n" +
        `\nTo add one of these books type "yarn start add (0 - 4)" or "node index.js (0 - 4)".\n` +
        "Type 'yarn start recent' or 'node index.js recent' to view your recent search if the data above goes missing.\n" +
        "\nType 'yarn start' or 'node index.js' for commands and clarification.\n" +
        "\n--------------------\n");
}

// Error message when user has no books in their reading list
message.viewReadingListError = () => console.log("\n--------------------\n" +
    "\nYou currently have no books in your Readinglist\n" +
    "Type 'yarn start add (0-4)' or 'node index.js add (0-4)' to add a book from your recent searches into your list!\n" +
    "\n--------------------\n");

// Error message when user doesn't have any books in their recent searches .json file
message.recentsError = () => console.log("\n--------------------\n" + "\nYou currently don't have any recent searches\n" + "\n--------------------\n");

// Success message to show a user's results of books from a recent search
message.showRecents = (data) => {
    console.log(JSON.parse(data));
    return console.log("\n--------------------\n" + "\nThese are your most recent searched book titles listed above!\n" + "\n--------------------\n");
}

// Error messages for when unable to add a book to a user's reading list
message.addBookError = (situation) => {
    switch (situation) {
        case "missingBookID":
            return console.log("\n--------------------\n" + "\nPlease indicate one book you want to add to your reading list with the numbers ranging from 0 - 4\n" + "\n--------------------\n");
        case "noRecentSearches":
            return console.log("\n--------------------\n" + "\nYou currently don't have any recent searches to add a book from\n" + "\n--------------------\n");
        default:
            return console.log("\n--------------------\n" + "\nThere was an error somewhere, please try again" + "\n--------------------\n");
    }
}

// Success message for adding a book to a user's reading list
message.addFirstBook = () => console.log("\n--------------------\n" + "\nAdding your first book!\n" + "\n--------------------\n");
message.addBookSuccess = () => console.log("\n--------------------\n" + "\nYou've added a book!\n" + "\n--------------------\n");

// Error and Helper message for when application commands are written incorrectly
message.incompleteCommand = () => console.log("\n--------------------\n" +
    `\nyarn start\n` +
    "yarn start search 'title of book'\n" +
    "yarn start view\n" +
    "yarn start recent\n" +
    "yarn start add (0 - 4)\n" +
    "\n----------\n" +
    "node index.js\n" +
    "node index.js search 'title of book'\n" +
    "node index.js view\n" +
    "node index.js recent\n" +
    "node index.js add (0 - 4)\n" +
    "\nSorry that command was a little confusing, please try one of the ones above!\n" +
    "\n--------------------\n");