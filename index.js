// node index.js / yarn start to initialize the application
const axios = require("axios");
const fs = require("fs");

async function initApp() {
    if (!process.argv[2]) {
        console.log("\nWelcome to your personal book saving application!\n" +
            "Please type out your commands for me\n" +
            "\nCommands\n" +
            "-------------" +
            "\nSearching - Search for a book from Google through its title\n" +
            "   Examples: Search Lord of the Rings\n" +
            "             Search Lord Rings\n" +
            "\nView - View your current reading list\n" +
            "\nRecent - View your recent searches that we're stored\n" +
            "\nAdd - Add one of the books you recently searched into your reading list. Books indicated by numbers and range from 0-4\n" +
            "   Examples: Add 0\n" +
            "             Add 4\n" +
            "\nExit - leave the application");
    } else {
        const choice = process.argv[2].toLowerCase();

        for (let i = 0; i < 3; i++) {
            process.argv.shift()
        }
        const userInput = process.argv
        const bookObj = { 0: "" }

        switch (choice) {
            case "search":
                const searchTerm = userInput.join("+")
                const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=5`;

                // Fetch call
                await axios.get(queryURL).then(async (res) => {
                    let count = 0
                    // Show current page's titles and authors and add a last option to click the next page
                    res.data.items.map(index => {
                        bookObj[count] = { title: index.volumeInfo.title, authors: index.volumeInfo.authors, publisher: index.volumeInfo.publisher }
                        count++;
                    })
                })

                // Then store it temporarily in a .json file
                return fs.writeFile("recentSearches.json", JSON.stringify(bookObj, null, 4), (err) => {
                    if (err) { throw err } else {
                        return console.log('\nYour searches have been added your recents temporary storage!\n');
                    }
                })
            case "view":
                return fs.readFile("./readingList.json", "UTF8", (err, data) => {
                    console.log(JSON.parse(data));
                })
            case "recent":
                return fs.readFile("./recentSearches.json", "UTF8", (err, data) => {
                    if (err) return ("You currently don't have any recent searches");
                    console.log(JSON.parse(data));
                });
            case "add":
                let increment = 0;
                if (!process.argv[0] || process.argv[1]) {
                    console.log("\nPlease indicate one book you want to add to your reading list\n");
                } else {
                    fs.readFile("./recentSearches.json", "UTF8", (err, data) => {
                        if (err) return ("You currently don't have any recent searches to add a book from");

                        const bookChoices = JSON.parse(data);
                        // console.log(bookChoices);
                        let readingList = {};

                        fs.readFile("./readingList.json", "UTF8", (err, data) => {
                            readingList = JSON.parse(data);
                            for (key in readingList) {
                                increment++
                            }
                            console.log(increment);
                            console.log(readingList);

                            readingList[increment] = bookChoices[process.argv[0]];



                            fs.writeFile("readingList.json", JSON.stringify(readingList, null, 4), (err) => {
                                if (err) throw err;
                                console.log("\nYou've added a book!");
                            })
                        });

                    });
                }
                break;
            default: break;
        }
    }

}

initApp();