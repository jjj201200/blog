/**
 * Author: Ruo
 * Create: 2018-03-28
 * Description: 扣血效果
 */

const Effect = require('../effects');

class ReduceBlood extends Effect {
    constructor({
        name, life, paramStr, power, preEffectId, postEffectId,
    }) {
        super({name, life, paramStr, power, preEffectId, postEffectId});
    }
    main() {

    }
}

module.exports = new ReduceBlood()