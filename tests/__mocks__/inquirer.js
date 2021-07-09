const inquirer = require("inquirer");

const iMockFn = (questions, resolveValue) => {
  const test = (inquirer.prompt = (questions) => {
    const dataKey = questions.name;
    return Promise.resolve({ [dataKey]: resolveValue });
  });

  return Promise.resolve(test(questions));
};

module.exports = iMockFn;
