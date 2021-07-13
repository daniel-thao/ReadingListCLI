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

  expect(mockInquirerResult).toEqual(myModule);
});

/*




 ===============
 App Questions Fn Test 1
*/
test.each([
  {
    appInquire: "starterQuestion",
    extraData: null,
    expected: {
      message: "What would you like to do?",
      type: "list",
      choices: ["Search For a Book", "Check Your Books", "Exit"],
      name: "choice",
    },
  },
  {
    appInquire: "searchBookByTitle",
    extraData: null,
    expected: {
      message: "What is the title or author of the book?",
      type: "input",
      name: "search",
    },
  },
  {
    appInquire: "selectBook",
    extraData: ["Book1", "Book2", "Book3", "Book4", "Book5"],
    expected: {
      message: "Which book would you like to save to your Reading List?",
      type: "list",
      choices: ["Book1", "Book2", "Book3", "Book4", "Book5"],
      name: "bookChosen",
    },
  },
  {
    appInquire: "isFinished",
    extraData: null,
    expected: { message: "Are you finished?", type: "confirm", name: "answer" },
  },
  {
    appInquire: "dsjakdl",
    extraData: null,
    expected: {
      message: "Something went amiss, would you like to try again?",
      type: "confirm",
      name: "exit",
    },
  },
])("test app questions", async ({ appInquire, extraData, expected }) => {
  let testResult;
  if (extraData === null) {
    testResult = appQuestions(appInquire);
  } else {
    testResult = appQuestions(appInquire, extraData);
  }
  expect(testResult).toEqual(expected);
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




 ===============
 Inquirer Test 3
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
Inquirer Test 4
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
============================================================
Integration tests
============================================================
*/

/*




 ===============
 Inquirer Test Suite 1
 */
test.each([
  {
    inquireData: appQuestions("starterQuestion"),
    index: 0,
    expected: "Search For a Book",
  },
  {
    inquireData: appQuestions("starterQuestion"),
    index: 1,
    expected: "Check Your Books",
  },
  {
    inquireData: appQuestions("starterQuestion"),
    index: 2,
    expected: "Exit",
  },
])(
  "correct app starter question choices for user",
  async ({ inquireData, index, expected }) => {
    const myModule = await inquire(inquireData).then((data) => {
      data.choice = inquireData.choices[index];
      return data.choice;
    });

    expect(myModule).toBe(expected);
  }
);

/*




===============
Inquirer Test Suite 2
*/

test.each([
  {
    inquireData: appQuestions("starterQuestion"),
    expected: "What would you like to do?",
  },
  {
    inquireData: appQuestions("searchBookByTitle"),
    expected: "What is the title or author of the book?",
  },
  {
    inquireData: appQuestions("selectBook"),
    expected: "Which book would you like to save to your Reading List?",
  },
  {
    inquireData: appQuestions("isFinished"),
    expected: "Are you finished?",
  },
])(
  "mesages from App with specfic questions",
  async ({ inquireData, expected }) => {
    const testResult = inquireData.message;

    expect(testResult).toBe(expected);
  }
);
