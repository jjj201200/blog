/**
 * Author: Ruo
 * Create: 2018-03-28
 * Description: 扣血效果
 */

const _ = require('lodash');
const Effect = require('../effects');

class ReduceBlood extends Effect {
    constructor({
        name, life, paramStr, power, targetType, range,
    }) {
        super({name, life, paramStr, power, targetType, range});
    }
    main() {
        _.at()
    }
}

module.exports = new ReduceBlood()