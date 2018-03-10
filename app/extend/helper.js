/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */
const _ = require('lodash');
const TYPES = {
    'object': Object,
    'string': String,
    'number': Number,
    'boolean': Boolean,
}
module.exports = {
    // 获取服务器时间，包含时区
    get currentTime() { return (new Date).getTime() + 8 * 3600000;},

    /**
     * 检测GET请求时的参数
     * @param {object} params
     * @param {object} rule
     * @returns {boolean}
     */
    checkParams(params, rule) {
        const currentRule = Object.assign(rule); // 因为要删除操作，先备份一下
        let passNum = Object.keys(rule).length;
        try {
            // 过滤能够匹配到的key
            _.map(params, (value, key) => {
                if (key in currentRule) {
                    if (value instanceof TYPES[currentRule[key].type]) {
                        delete currentRule[key]; // 将匹配到的key删掉
                        passNum--;
                    }
                } else {
                    // TODO  处理提交了错误的参数
                }
            });

            //处理没有匹配到的key
            passNum = Object.keys(currentRule).length; // 没有匹配到的key的数组
            _.map(currentRule, (value, key) => {
                if (key.required === true) {
                    throw new Error(`not catch param ${key}`);
                } else passNum--;
            });
        } catch (e) {
            console.error(e);
        }
        return passNum === 0;
    },
};