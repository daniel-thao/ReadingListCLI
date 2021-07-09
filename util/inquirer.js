const inquirer = require("inquirer");

async function inquire(questions) {
    return await inquirer.prompt(questions);
} 

module.exports = inquire;
