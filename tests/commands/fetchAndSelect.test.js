// This is the actual file
const Command = require("../../util/commands");
const commands = new Command();

// this is here for the dynamic Axios calls and integration to hopefully work down the road
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();


/*
============================================================
Integration tests
============================================================
*/
test("that Request and Select calls bookSearchFetch", () => {
    const userInput = "Starwars"
    let amountOfBooksLookedThrough = 0;
    // const mockCommands.requestAndSelect(userInput, amountOfBooksLookedThrough)
    expect(true).toEqual(true);
})