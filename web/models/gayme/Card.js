/**
 * Author: Ruo
 * Create: 2018-03-27
 * Description: 卡牌，即动作的定义者
 */
/**
 * 属性
 * 动作执行的对象 [userId]
 * 动作目标对象 [userId]
 * 效果发动队列 [array<Effect>]
 */

import _ from 'lodash';
import {observable} from 'mobx';

export class Card {
    constructor({cardId, targetType, type, name = '', effect = [], duration = 0, consume = 0, number = 0}) {
        Object.assign(this, {
            cardId, type, name, effect, targetType, duration,
            consume, number,
        });
    }

    @observable cardId; // 卡牌的系统编号
    @observable type; // 卡牌分类编号，暂时用数字，之后可以用字符串枚举值
    @observable targetType; // 卡牌效果能够作用的对象类型（编号）
    @observable name = ''; // 卡牌的名字
    @observable effect = []; // 发动卡牌会造成的效果, effect对象，如:reduceBlood
    @observable duration = 0; // 卡牌效果持续回合数，如：攻击牌持续时间0，防御牌持续时间1
    @observable consume = 0; // 卡牌发动所需的费用
    @observable number = 0; // 卡牌的数量
    @observable hasSaved = false; // 标记卡牌是否保存过
    @observable hasEdited = false; // 标记卡牌是否编辑过
    set({...values}) {
        _.forEach(values, (k, v) => {
            if (this[k]) {
                if (v !== undefined) this[k] = v;
                else console.error(`value is undefined`);
            } else console.error(`unknown param: ${k}`);
        });
    }
}