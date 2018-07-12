/**
 * Author: Ruo
 * Create: 2018-03-18
 * Description:
 */
const colors = require('colors');
let stepNum = 1;
module.exports = {
    message: (msg, color = 'green') => {
        console.log(`\n${stepNum}. ${msg}\n`[color]);
        stepNum += 1;
    },
};