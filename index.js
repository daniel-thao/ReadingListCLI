// These are the other questions and functions
const appAsks = require("./questions/questions");

// functions that mirror the inquirer questions
const CommandCenter = require("./util/commandCenter");
const commandCenter = new CommandCenter();

// my exporting of inquirer
const inquire = require("./util/inquirer");

// function for recursion
function initQuestion() {
  console.clear()
  inquire(appAsks("starterQuestion")).then(async (choiceArr) => {
    switch (choiceArr.choice) {
      case "Search For a Book":
        // Send them to the next question
        await commandCenter.bookTitleSearch();
        // return restart();
        break;
      case "Check Your Books":
        // reads the db
        await commandCenter.lookAtReadingList();
        // return restart();
        break;
      case "Exit":
        return console.log("\nPleasure to be of Service!");
      default:
        return;
    }
  });
}

// // Restarts or exits the app
// const restart = async () => {
//   // timed question in order to avoid some bugs with inquirer
//   setTimeout(async () => {
//     const shouldStop = await commandCenter.isUserFinished();
//     if (shouldStop) {
//       return console.log("\nPleasure to be of Service!");
//     } else initQuestion();
//   }, 300);
// };

initQuestion();