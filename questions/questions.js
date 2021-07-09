function appAsks(appPrompt, extraData) {
    switch (appPrompt.trim()) {
      case "starterQuestion":
        return {
          message: "What would you like to do?",
          type: "list",
          choices: ["Search For a Book", "Check Your Books", "Exit"],
          name: "choice",
        };
      case "searchBookByTitle":
        return {
          message: "What is the title or author of the book?",
          type: "input",
          name: "search",
        };
      case "selectBook":
        return {
          message: "Which book would you like to save to your Reading List?",
          type: "list",
          choices: extraData,
          name: "bookChosen",
        };
      case "isFinished":
        return {
          message: "Are you finished?",
          type: "confirm",
          name: "answer",
        };
      default:
        return {
          message: "Something went amiss, would you like to try again?",
          type: "confirm",
          name: "exit",
        };
    }
  }
  
  module.exports = appAsks;