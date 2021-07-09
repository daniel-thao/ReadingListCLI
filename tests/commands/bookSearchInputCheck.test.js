const Command = require("../../util/commands");
const commands = new Command();

/*
============================================================
UNIT tests
============================================================
*/

/*




 ===============
 bookSearchInputCheck Test suite 1
 */
test.each([
  { string: "$1Million Dollars", expected: false },
  { string: "You & Me", expected: false },
  { string: "Maths 1+1 = 2", expected: false },
  { string: "Subtraction, 1-1 = 0", expected: false },
  { string: "function myName()", expected: false },
  { string: "Top 1% of the world Habits", expected: false },
  { string: "Can I get your #?", expected: false },
  { string: "You and Me = Love", expected: false },
  { string: "Stay Happy ^.^", expected: false },
  { string: "from*", expected: false },
])("blacklisted characters", async ({ string, expected }) => {
  testResults = await commands.bookSearchInputCheck(string);
  expect(testResults).toBe(expected);
});

/*




 ===============
 bookSearchInputCheck Test suite 2
 */
test.each([
  { value: 10, expected: false },
  { value: 23.32, expected: false },
  { value: null, expected: false },
  { value: [[],"daksdl"], expected: false },
  { value: {string: "dsadasddkwoa;"}, expected: false },
  { value: undefined, expected: false },
  { value: "                      ", expected: false },
  { value: "", expected: false },
  { value: ["ello", "world"], expected: false },
])("other false parameters", async ({ value, expected }) => {
  testResults = await commands.bookSearchInputCheck(value);
  expect(testResults).toBe(expected);
});

/*




 ===============
 bookSearchInputCheck Test suite 3
 */
 test.each([
    { value: "Lord of the Rings ", expected: true },
    { value: "HARRY POTTER", expected: true },
    { value: "JK Rowling", expected: true },
    { value: "Life of an Ant", expected: true },
    { value: "E.E. Cumming", expected: true },
    { value: "Henry", expected: true },
    { value: "   Yessir   ", expected: true },
    { value: "Welcome  To Narnia ", expected: true },
    { value: "J.R.R Tolkien", expected: true },
  ])("pararmeters that work", async ({ value, expected }) => {
    testResults = await commands.bookSearchInputCheck(value);
    expect(testResults).toBe(expected);
  });