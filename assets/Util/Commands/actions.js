const axios = require("axios");
const fs = require("fs");
const message = require("../../UIMessages/messages");

// export new Obj variable with methods
module.exports = command = {};

// Searches the Google Books API for the terms inputted
command.search = async (userInput, bookObj) => {
    const searchTerm = userInput.join("+")
    const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=5`;

    // Fetch call to GoogleBooks
    await axios.get(queryURL).then(async (res) => {
        let count = 0
        // Show current page's titles and authors and add a last option to click the next page
        res.data.items.map(index => {
            bookObj[count] = { title: index.volumeInfo.title, authors: index.volumeInfo.authors, publisher: index.volumeInfo.publisher }
            count++;
        })
    })

    // Then store those books temporarily in a .json file as a psuedo DB
    return fs.writeFile("recentSearches.json", JSON.stringify(bookObj, null, 4), (err) => {
        if (err) { throw err } else return message.search(bookObj);
    })
}

// Shows user all books in their reading list
command.view = async () => fs.readFile("./readingList.json", "UTF8", (err, data) => {
    if (err) return message.viewReadingListError();
    return console.log(JSON.parse(data));
})

// Shows user all books that matched their most recent search
command.recent = async () => fs.readFile("./recentSearches.json", "UTF8", (err, data) => {
    if (err) return message.recentsError();
    return message.showRecents(data);
});

// Adds one book to a user's reading list
command.add = async (CLIArray) => {
    // increment count for keeping track of books in reading list
    let increment = 0;

    if (!CLIArray[0] || CLIArray[1] || CLIArray[0] > 4) {
        message.addBookError("missingBookID");
    } else {
        // first read check to see if there is a recentSearches db and if not, give user suggestions to do other commands
        fs.readFile("./recentSearches.json", "UTF8", (err, data) => {
            if (err) return message.addBookError("noRecentSearches");

            // Otherwise temporarily store it to select which book chosen later
            const bookChoices = JSON.parse(data);

            // establish the basis of which the new data will be built upon
            let readingList = {};
            fs.readFile("./readingList.json", "UTF8", (err, data) => {
                if (err) message.addFirstBook();
                else {
                    readingList = JSON.parse(data);

                    // increment number in order to keep track of how many books are in user's reading list
                    for (key in readingList) {
                        increment++
                    }
                }

                // set the chosen book to a new entry and then rewrite the .json file with the new entry
                readingList[increment] = bookChoices[CLIArray[0]];

                fs.writeFile("readingList.json", JSON.stringify(readingList, null, 4), (err) => {
                    if (err) throw err;
                    message.addBookSuccess();
                })
            });

        });
    }
}