// node index.js / yarn start to initialize the application
const message = require("./assets/UIMessages/messages");
const command = require("./assets/Util/Commands/actions");

async function initApp() {
    // If there is no applcation command, show opening message
    if (!process.argv[2]) {
        message.entrance();
    } else {
        // turns all letters to lowercase for consistency
        const choice = process.argv[2].toLowerCase();

        // takes out all the init and application commands
        for (let i = 0; i < 3; i++) {
            process.argv.shift()
        }

        // new variables to create search terms and list books in
        const userInput = process.argv
        const bookObj = { 0: "" }

        // based on application commands, do these actions
        switch (choice) {
            case "search":
                return command.search(userInput, bookObj);
            case "view":
                return command.view();
            case "recent":
                return command.recent();
            case "add":
                return command.add(process.argv);
            default: return message.incompleteCommand();
        }
    }

}

initApp();