"use strict";

const path = require("path");

const fs = jest.createMockFromModule("fs");

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  console.log(newMockFiles);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
    console.log(mockFiles);
  }
}

function mockReadFile(pathToFile, readingListData, howManyBooks) {
  if (pathToFile !== "/path/to/mockreadinglist.json") {
    return null;
  } else {
    switch (readingListData) {
      case "emptyData":
        readingListData = {};
        break;
      case "notEmpty":
        readingListData = {};
        for (let i = 0; i < howManyBooks; i++) {
          readingListData[i] = { Title:`book ${i}`, Author: "fake", Publisher: "null" };
        }
        break;
      default:
        console.log("Shouldn't get here");
        break;
    }
  }
  return readingListData;
}

function mockWriteFile(pathToFile, oldData, newData) {
  let count = 0;

  if (
    pathToFile !== "/path/to/mockreadinglist.json" ||
    oldData === undefined ||
    oldData === null ||
    newData === undefined ||
    newData === null
  ) {
    return null;
  } else if (oldData[0] === undefined || oldData[0] === null) {
    oldData[0] = newData;
  } else {
    for (const keys in oldData) {
      count++;
    }
    oldData[count] = newData;
    // console.log(oldData);
    // console.log(newData);
  }
  return oldData;
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(file) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.mockReadFile = mockReadFile;
fs.mockWriteFile = mockWriteFile;

module.exports = fs;
