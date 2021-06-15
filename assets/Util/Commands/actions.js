const axios = require("axios");
const fs = require("fs");
const message = require("../../UIMessages/messages");

module.exports = command = {};

command.search = async (userInput, bookObj) => {
    const searchTerm = userInput.join("+")
    const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=5`;

    // Fetch call
    await axios.get(queryURL).then(async (res) => {
        console.log(res);
        let count = 0
        // Show current page's titles and authors and add a last option to click the next page
        res.data.items.map(index => {
            bookObj[count] = { title: index.volumeInfo.title, authors: index.volumeInfo.authors, publisher: index.volumeInfo.publisher }
            count++;
        })
    })

    // Then store it temporarily in a .json file
    return fs.writeFile("recentSearches.json", JSON.stringify(bookObj, null, 4), (err) => {
        if (err) { throw err } else return message.search(bookObj);
    })
}