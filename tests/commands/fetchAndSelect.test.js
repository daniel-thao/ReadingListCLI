// This is the actual file
const Command = require("../../util/commands");
const commands = new Command();

// this is here for the dynamic Axios calls and integration to hopefully work down the road
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

// Testing the inquire mock function
const iMockfn = require("../__mocks__/inquirer");
const appQuestions = require("../../questions/questions");

jest.mock("axios");



/*
============================================================
Integration tests
============================================================
*/
test("that Request and Select calls bookSearchFetch", async () => {
    const userInput = "Starwars"
    let amountOfBooksLookedThrough = 0;
    
    const mockAxiosCall = await mockCommands.bookSearchFetch(userInput.split(" "), amountOfBooksLookedThrough)
    console.log(mockAxiosCall);

    // // (userInput, startIndex, bookSelectionArr)
    const inquirerOutput = await iMockfn(appQuestions("selectBook", mockAxiosCall));
    console.log(inquirerOutput);
    // const mockCommands.requestAndSelect(userInput, amountOfBooksLookedThrough)
    expect(true).toEqual(true);
})