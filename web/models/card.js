/**
 * Author: Ruo
 * Create: 2018-03-25
 * Description: card
 */

import {observable, action} from 'mobx';
import {formDate2YMDHMS} from 'DFUtils';

export class Card {
    //TODO 改名为Article
    /**
     * 文章对象
     * @param title
     * @param tags
     * @param content
     */
    constructor({
                    id,
                    targetType = 0,
                    type = 0,
                    name = '',
                    attack = 0,
                    defend = 0,
                    duration = 0,
                    hasSaved = false,
                    hasEdited = false,
                } = {
        id,
        targetType: '',
        type: 0,
        name: '',
        attack: 0,
        defend: 0,
        duration: 0,
        hasSaved: false,
        hasEdited: false,
    }) {
        this.set({id, targetType, type, name, attack, defend, duration, hasSaved, hasEdited});
    }

    @observable id;
    @observable targetType = 0; // 卡牌作用类型，即能够作用在哪一方的
    @observable type = 0; // 卡牌分类编号，暂时用数字，之后可以用字符串枚举值
    @observable name = '';
    @observable attack = 0; // 卡牌发动效果 - 造成多少点伤害 - 攻击值
    @observable defend = 0; // 卡牌发动效果 - 给予多少点格挡 - 防御值
    @observable duration = 0; // 卡牌效果持续回合数，如：攻击牌持续时间0，防御牌持续时间1

    // local params
    @observable hasSaved = false; // 标记卡牌是否保存过
    @observable hasEdited = false; // 表示卡牌是否被编辑过了

    set({id, targetType, type, name, attack, defend, duration, hasSaved, hasEdited}) {
        if (id !== undefined) this.id = id;
        if (targetType !== undefined) this.targetType = targetType;
        if (type !== undefined) this.type = type;
        if (name !== undefined) this.name = name;
        if (attack !== undefined) this.attack = attack;
        if (defend !== undefined) this.defend = defend;
        if (duration !== undefined) this.duration = duration;

        if (hasSaved !== undefined) this.hasSaved = hasSaved;
        if (hasEdited !== undefined) this.hasEdited = hasEdited;
    }
}
