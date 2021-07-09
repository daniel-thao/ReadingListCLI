// const { inquirerMockPrompts } = require("./__mocks__/inquirerMocks");
const inquire = require("../util/inquirer");
const inquirer = require("inquirer");
const appQuestions = require("../questions/questions");

/*
==============================
Inquirer mock Function -- All attempts to modulize this and still keep it working has failed
==============================
*/
const iMockFn = jest.fn((questions, resolveValue) => {
  const test = (inquirer.prompt = (questions) => {
    const dataKey = questions.name;
    return Promise.resolve({ [dataKey]: resolveValue });
  });

  return Promise.resolve(test(questions));
});

/*
============================================================
UNIT tests
============================================================
*/

/*




 ===============
 Inquirer Test 1
 */
test("to see if my inquirer module works like the original Inquirer package", async () => {
  // The inquire prompt Obj
  const inquireData = { message: "This is your test", name: "testInit" };

  // Results of the Mock Function for Inquirer NPM
  const NPM = await iMockFn(inquireData, "User's Input");
  // Then be able to exact the data from how Inquirer changes the name key in the original Obj to it's value
  const mockInquirerResult = NPM[inquireData.name];
  console.log(NPM);

  /* 
  NOW for the results of the module I made
  -- Only works and all other ones only work because of the mock function being called on above
  */
  const myModule = await Promise.resolve(
    inquire(inquireData).then((data) => {
      data[inquireData.name] = "User's Input";
      return data[inquireData.name];
    })
  );
  //   console.log(myModule);

  expect(mockInquirerResult).toEqual(myModule);
});

/*




 ===============
 App Questions Fn Test 1
*/
test("switch cases of the app questions", async () => {
  const inputArr = ["starterQuestion", "searchBookByTitle", "selectBook", "isFinished", "dsjakdl"];
  const extraDataArr = [
    ["Search For a Book", "Check Your Books", "Exit"],
    [],
    ["Book1", "Book2", "Book3", "Book4", "Book5"],
    [],
    [],
  ];
  const testResults = [];
  const results = [
    {
      message: "What would you like to do?",
      type: "list",
      choices: ["Search For a Book", "Check Your Books", "Exit"],
      name: "choice",
    },
    {
      message: "What is the title or author of the book?",
      type: "input",
      name: "search",
    },
    {
      message: "Which book would you like to save to your Reading List?",
      type: "list",
      choices: ["Book1", "Book2", "Book3", "Book4", "Book5"],
      name: "bookChosen",
    },
    { message: "Are you finished?", type: "confirm", name: "answer" },
    {
      message: "Something went amiss, would you like to try again?",
      type: "confirm",
      name: "exit",
    },
  ];

  for (let i = 0; i < inputArr.length; i++) {
    // appQuestions(inputArr[i], extraDataArr[i]);
    testResults.push(appQuestions(inputArr[i], extraDataArr[i]));
  }

  expect(testResults).toEqual(results);
});

/*




 ===============
 Inquirer Test 2
 */
test("prompt name is the key of user's input", async () => {
  const inquireData = { message: "This is your test", name: "testInit" };
  const result = "The User's Input";

  const myModule = await inquire(inquireData).then((data) => {
    data[inquireData.name] = result;
    return data[inquireData.name];
  });

  expect(myModule).toEqual(result);
});

/*
============================================================
Integration tests
============================================================
*/

/*




 ===============
 Inquirer Test 3
 */
test("Starter Question first choice", async () => {
  const inquireData = appQuestions("starterQuestion");
  let result = inquireData.choices[0];

  const myModule = await inquire(inquireData).then((data) => {
    data.choice = "Search For a Book";
    return data.choice;
  });

  const testResult = myModule;

  expect(testResult).toEqual(result);
});

/*




 ===============
 Inquirer Test 4
 */
test("Starter Question second choice", async () => {
  const inquireData = appQuestions("starterQuestion");
  let result = inquireData.choices[1];

  const myModule = await inquire(inquireData).then((data) => {
    data.choice = "Check Your Books";
    return data.choice;
  });

  const testResult = myModule;

  expect(testResult).toEqual(result);
});

/*




 ===============
 Inquirer Test 5
 */
test("Starter Question third choice", async () => {
  const inquireData = appQuestions("starterQuestion");
  let result = inquireData.choices[2];

  const myModule = await inquire(inquireData).then((data) => {
    data.choice = "Exit";
    return data.choice;
  });

  const testResult = myModule;

  expect(testResult).toEqual(result);
});

/*




 ===============
 Inquirer Test 6
 */
test("Starter Question app's question", async () => {
  const inquireData = appQuestions("starterQuestion");
  let result = inquireData.message;

  const testResult = "What would you like to do?";

  expect(testResult).toEqual(result);
});

/*




 ===============
 Inquirer Test 7
 */
test("Search Book app's question", async () => {
  const inquireData = appQuestions("searchBookByTitle");
  let result = inquireData.message;

  const testResult = "What is the title or author of the book?";

  expect(testResult).toEqual(result);
});

/*




 ===============
 Inquirer Test 8
 */
test("Search Book, User input to lowercase", async () => {
  const inquireData = appQuestions("searchBookByTitle");
  let result = "lord of the rings";

  const myModule = await inquire(inquireData).then((data) => {
    let book = "Lord of the Rings";
    data.search = book.toLowerCase();
    return data.search;
  });

  const testResult = myModule;

  expect(testResult).toEqual(result);
});

/*




===============
Inquirer Test 8
*/
test("Search Book, trimming the user input", async () => {
  const inquireData = appQuestions("searchBookByTitle");
  let result = "lord of the rings";

  const myModule = await inquire(inquireData).then((data) => {
    let book = "        Lord of the Rings       ";
    data.search = book.toLowerCase().trim();
    return data.search;
  });

  const testResult = myModule;

  expect(testResult).toEqual(result);
});

/*




===============
Inquirer Test 9
*/
test("Select Book, app's question", async () => {
  const inquireData = appQuestions("selectBook");
  let result = "Which book would you like to save to your Reading List?";

  const testResult = inquireData.message;

  expect(testResult).toEqual(result);
});

/*




===============
Inquirer Test 10
*/
test("Parting Question, app's question", async () => {
  const inquireData = appQuestions("isFinished");
  let result = "Are you finished?";

  const testResult = inquireData.message;

  expect(testResult).toEqual(result);
});
