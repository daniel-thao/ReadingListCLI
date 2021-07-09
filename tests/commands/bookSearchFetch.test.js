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
  const booksWithNextButton = await mockCommands.bookSearchFetch(
    userInput.split(" "),
    0
  );
  const results = [
    `Title: ${"Lord of the rings 0"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 1"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 2"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 3"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 4"}\nAuthor: "fake"\nPublisher: "null"\n`,
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
  const booksWithNextButton = await mockCommands.bookSearchFetch(
    userInput.split(" "),
    5
  );

  const results = [
    `Title: ${"Lord of the rings 5"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 6"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 7"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 8"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 9"}\nAuthor: "fake"\nPublisher: "null"\n`,
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
  const booksWithNextButton = await mockCommands.bookSearchFetch(
    userInput.split(" "),
    10
  );

  const results = [
    `Title: ${"Lord of the rings 10"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 11"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 12"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 13"}\nAuthor: "fake"\nPublisher: "null"\n`,
    `Title: ${"Lord of the rings 14"}\nAuthor: "fake"\nPublisher: "null"\n`,
    ".....Next Page Results\n",
  ];
  
  expect(booksWithNextButton).toEqual(results);
});
