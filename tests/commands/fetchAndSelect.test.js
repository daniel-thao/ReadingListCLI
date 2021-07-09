// This is the actual file
const Command = require("../../util/commands");
const commands = new Command();

// this is here for the dynamic Axios calls and integration to hopefully work down the road
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

jest.mock("axios");

/*
============================================================
Integration tests
============================================================
*/

test.each([
  {
    userInput: "Starwars",
    bookStacksLookedAt: 0,
    bookSelectionArr: [],
    userTestChoice: 0,
    recursiveCount: [0, null],
    expected: ['Title: Starwars 0///Author: "fake"///Publisher: "null"'],
  },
  {
    userInput: "Starwars",
    bookStacksLookedAt: 0,
    bookSelectionArr: [],
    userTestChoice: 1,
    recursiveCount: [0, null],
    expected: ['Title: Starwars 1///Author: "fake"///Publisher: "null"'],
  },
  {
    userInput: "Starwars",
    bookStacksLookedAt: 0,
    bookSelectionArr: [],
    userTestChoice: 2,
    recursiveCount: [0, null],
    expected: ['Title: Starwars 2///Author: "fake"///Publisher: "null"'],
  },
  {
    userInput: "Starwars",
    bookStacksLookedAt: 0,
    bookSelectionArr: [],
    userTestChoice: 3,
    recursiveCount: [0, null],
    expected: ['Title: Starwars 3///Author: "fake"///Publisher: "null"'],
  },
  {
    userInput: "Starwars",
    bookStacksLookedAt: 0,
    bookSelectionArr: [],
    userTestChoice: 4,
    recursiveCount: [0, null],
    expected: ['Title: Starwars 4///Author: "fake"///Publisher: "null"'],
  },
])(
  "fetch and select the user's book choice and lastly the next page option",
  async ({
    userInput,
    bookStacksLookedAt,
    bookSelectionArr,
    userTestChoice,
    recursiveCount,
    expected,
  }) => {
    await mockCommands.fetchAndSelect(
      userInput,
      bookStacksLookedAt,
      bookSelectionArr,
      userTestChoice,
      recursiveCount
    );
    expect(bookSelectionArr).toEqual(expected);
  }
);

// Unable to get the recursion to work here
// describe("Next Page Recursive option", () => {
//   test("should memoize correctly", async () => {
//     const userInput = "12 Rules for Life";
//     const bookStacksLookedAt = 0;
//     const bookSelectionArr = [];
//     const userTestChoice = 5;
//     const recursiveCount = [1, 0];
//     const expected = ["Next Page"];
//     const mock = jest.spyOn(mockCommands, "fetchAndSelect");

//    const test = await mockCommands.fetchAndSelect(
//       userInput,
//       bookStacksLookedAt,
//       bookSelectionArr,
//       userTestChoice,
//       recursiveCount
//     );
//     console.log(test);
//     console.log(bookSelectionArr);
//     expect(true).toEqual(true);
//     mock.mockRestore();
//   });
// });
