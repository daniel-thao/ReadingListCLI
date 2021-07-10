// This is the actual file
const Command = require("../../util/commands");
const commands = new Command();

// this is here for the dynamic Axios calls and integration to hopefully work down the road
const mockCommand = require("../__mocks__/commands");
const mockCommands = new mockCommand();

/*
============================================================
UNIT tests
============================================================
*/

test.each([
  {
    fASResult: ['Title: Starwars 0///Author: "fake"///Publisher: "null"'],
    expected: { Title: "Starwars 0", Author: '"fake"', Publisher: '"null"' },
  },
  {
    fASResult: ['Title: Starwars 1///Author: "fake"///Publisher: "null"'],
    expected: { Title: "Starwars 1", Author: '"fake"', Publisher: '"null"' },
  },
  {
    fASResult: ['Title: Starwars 2///Author: "fake"///Publisher: "null"'],
    expected: { Title: "Starwars 2", Author: '"fake"', Publisher: '"null"' },
  },
  {
    fASResult: ['Title: Starwars 3///Author: "fake"///Publisher: "null"'],
    expected: { Title: "Starwars 3", Author: '"fake"', Publisher: '"null"' },
  },
  {
    fASResult: ['Title: Starwars 4///Author: "fake"///Publisher: "null"'],
    expected: { Title: "Starwars 4", Author: '"fake"', Publisher: '"null"' },
  },
])(
  "Fetch and Select Results to be parsed correctly",
  async ({ fASResult, expected }) => {
    const testResult = await commands.selectionFilterAndFormat(fASResult);
    expect(testResult).toEqual(expected);
  }
);
