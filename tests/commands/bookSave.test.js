jest.mock("fs");
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

/*
============================================================
Integration tests
============================================================
*/

test.each([
  //
  {
    bookToSave: {
      Title: "The Lord of the Rings",
      Author: "J. R. R. Tolkien",
      Publisher: "Mariner Books",
    },
    readingListData: "emptyData",
    howManyBooks: 0,
    expected: {
      0: {
        Title: "The Lord of the Rings",
        Author: "J. R. R. Tolkien",
        Publisher: "Mariner Books",
      },
    },
  },

  //

  {
    bookToSave: {
      Title: "The Lord of the Rings",
      Author: "J. R. R. Tolkien",
      Publisher: "Mariner Books",
    },
    readingListData: "notEmpty",
    howManyBooks: 1,
    expected: {
      0: {
        Title: "book 0",
        Author: "fake",
        Publisher: "null",
      },
      1: {
        Title: "The Lord of the Rings",
        Author: "J. R. R. Tolkien",
        Publisher: "Mariner Books",
      },
    },
  },

  //

  {
    bookToSave: {
      Title: "The Lord of the Rings",
      Author: "J. R. R. Tolkien",
      Publisher: "Mariner Books",
    },
    howManyBooks: 7,
    readingListData: "notEmpty",
    expected: {
      0: {
        Title: "book 0",
        Author: "fake",
        Publisher: "null",
      },
      1: {
        Title: "book 1",
        Author: "fake",
        Publisher: "null",
      },
      2: {
        Title: "book 2",
        Author: "fake",
        Publisher: "null",
      },
      3: {
        Title: "book 3",
        Author: "fake",
        Publisher: "null",
      },
      4: {
        Title: "book 4",
        Author: "fake",
        Publisher: "null",
      },
      5: {
        Title: "book 5",
        Author: "fake",
        Publisher: "null",
      },
      6: {
        Title: "book 6",
        Author: "fake",
        Publisher: "null",
      },
      7: {
        Title: "The Lord of the Rings",
        Author: "J. R. R. Tolkien",
        Publisher: "Mariner Books",
      },
    },
  },

  //
])(
  "integration tests for bookSave, isDBEmpty, and addBookToDB",
  async ({ bookToSave, readingListData, howManyBooks, expected }) => {
    const testResults = await mockCommands.bookSave(
      bookToSave,
      readingListData,
      howManyBooks
    );

    expect(JSON.stringify(testResults)).toEqual(JSON.stringify(expected));
  }
);

test.each([
  {
    bookToSave: {
      Title: "book 0",
      Author: "fake",
      Publisher: "null",
    },
    howManyBooks: 1,
    readingListData: "notEmpty",
    expected: "You already have this saved in your list.\n",
  },
])(
  "Unable to save a book that already exists in your reading list",
  async ({ bookToSave, readingListData, howManyBooks, expected }) => {
    const testResults = await mockCommands.bookSave(
      bookToSave,
      readingListData,
      howManyBooks
    );

    expect(testResults).toEqual(expected);
  }
);
