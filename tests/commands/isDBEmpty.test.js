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
    howManyBooks: 1,
    readingListData: "notEmpty",
    pathToFile: "/path/to/mockreadinglist.json",
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
    howManyBooks: 0,
    readingListData: "emptyData",
    pathToFile: "/path/to/mockreadinglist.json",
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
    howManyBooks: 7,
    readingListData: "notEmpty",
    pathToFile: "/path/to/mockreadinglist.json",
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
  "integration of isDbEmpty and Add book to DB",
  async ({
    bookToSave,
    readingListData,
    howManyBooks,
    pathToFile,
    expected,
  }) => {
    const testResults = await mockCommands.isDBEmpty(
      bookToSave,
      readingListData,
      howManyBooks,
      pathToFile
    );
    expect(JSON.stringify(testResults)).toEqual(JSON.stringify(expected));
  }
);
