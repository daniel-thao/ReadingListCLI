// This is the actual file
const Command = require("../../util/commands");
const commands = new Command();

// this is here for the dynamic Axios calls and integration to hopefully work down the road
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

jest.mock("fs");
jest.mock("axios");

/*
============================================================
UNIT tests
============================================================
*/

/*




===============
bookSearchFetch Test 1
*/
test("The mock Commands file in the mock folder and testing the mock axios call", async () => {
  const userInput = "Lord of the rings";
  const booksWithNextButton = await mockCommands.bookSearchFetch(userInput.split(" "), 0);

  const results = [
    { volumeInfo: { title: "Lord of the rings 0", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 1", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 2", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 3", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 4", authors: "fake", publisher: "null" } },
    ".....Next Page Results\n",
  ];

  expect(booksWithNextButton).toEqual(results);
});

/*




===============
bookSearchFetch Test 2
*/
test("If starting index changes, that the books change too", async () => {
  const userInput = "Lord of the rings";
  const booksWithNextButton = await mockCommands.bookSearchFetch(userInput.split(" "), 5);

  const results = [
    { volumeInfo: { title: "Lord of the rings 5", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 6", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 7", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 8", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 9", authors: "fake", publisher: "null" } },
    ".....Next Page Results\n",
  ];

  expect(booksWithNextButton).toEqual(results);
});

/*




===============
bookSearchFetch Test 3
*/
test("If starting index changes, that the books change for a third time", async () => {
  const userInput = "Lord of the rings";
  const booksWithNextButton = await mockCommands.bookSearchFetch(userInput.split(" "), 10);

  const results = [
    { volumeInfo: { title: "Lord of the rings 10", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 11", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 12", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 13", authors: "fake", publisher: "null" } },
    { volumeInfo: { title: "Lord of the rings 14", authors: "fake", publisher: "null" } },
    ".....Next Page Results\n",
  ];

  expect(booksWithNextButton).toEqual(results);
});
