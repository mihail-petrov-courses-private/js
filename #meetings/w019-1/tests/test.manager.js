const chalk = require('chalk');

const test = (description, given, expected) => {

    console.log();
    console.log(`Test: ${description}`);
    if(given == expected) {
        return console.log(chalk.green('PASS'));
    }
    
    console.log(chalk.red('FAIL'));
    console.log(given)
    console.log(expected);
};

module.exports = test;