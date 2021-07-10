const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

/*
============================================================
Unit tests
============================================================
*/
test("adding book to db", async () => {
  const bookToSave = {
    Title: "The Lord of the Rings",
    Author: "J. R. R. Tolkien",
    Publisher: "Mariner Books",
  };
  const fakeDB = {
    0: {
      Title: "The Lord of the Rings: Two Towers",
      Author: "J. R. R. Tolkien",
      Publisher: "Mariner Books",
    },
  };
  const pathToFile = "/path/to/mockreadinglist.json";

  const results = {
    0: {
      Title: "The Lord of the Rings: Two Towers",
      Author: "J. R. R. Tolkien",
      Publisher: "Mariner Books",
    },
    1: {
      Title: "The Lord of the Rings",
      Author: "J. R. R. Tolkien",
      Publisher: "Mariner Books",
    },
  };

  const testResults = await mockCommands.addBookToDB(
    bookToSave,
    JSON.stringify(fakeDB),
    pathToFile
  );

  expect(JSON.stringify(testResults)).toEqual(JSON.stringify(results));
});
