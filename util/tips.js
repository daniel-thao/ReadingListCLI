function appUIErrMsg(appPrompt, extraData) {
  switch (appPrompt.trim()) {
    case "invalid Input":
      return console.log(
        "\n\n--------------" +
          "\n\nPlease correctly write the full title of the book or a snippet of the Title" +
          "\n\n--------------\n\n\n"
      );
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

module.exports = appUIErrMsg;
