// node index.js / yarn start to initialize the application
const axios = require("axios");

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
        const searchTerms = process.argv

        const bookObj = { 0: "" }

        switch (choice) {
            case "search":
                const queryURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&maxResults=5`;


                // Fetch call
                await axios.get(queryURL).then(async (res) => {
                    let count = 0
                    // Show current page's titles and authors and add a last option to click the next page
                    const resTitleAndAuthors = res.data.items.map(index => {
                        bookObj[count] = { title: index.volumeInfo.title, authors: index.volumeInfo.authors, publisher: index.volumeInfo.publisher }
                        count++;
                    })
                })

                console.log()
                return console.log("they wanted to Search");
            case "view":
                return console.log("they wanted to check their list");
            default: break;
        }
    }

}

initApp();