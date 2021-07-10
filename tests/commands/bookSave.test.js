jest.mock("fs");
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

/*
============================================================
Integration tests
============================================================
*/

describe("Search for Book process, saveBook to local empty DB, mock", () => {
  const bookToSave = { Title: "book1", Author: "fake", Publisher: "null" };
  const mockDirPath = "/path/to/mockreadinglist.json";
  let mockReadinglistDB;
  const result = { 0: bookToSave };

  beforeEach(() => {
    // Set up some mocked out file info before each test
    mockReadinglistDB = require("fs").mockReadFile(mockDirPath, "emptyData");
  });

  test("includes all files in the directory in the summary", async () => {
    const newMockRLDB = await require("fs").mockWriteFile(
      mockDirPath,
      mockReadinglistDB,
      bookToSave
    );
    expect(result).toEqual(newMockRLDB);
  });
});

