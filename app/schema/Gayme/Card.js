/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const Card = new Schema({
        name: {
            type: String,
            required: true,
        },
        type: { // 卡牌分类编号，暂时用数字，之后可以用字符串枚举值
            type: Number,
            default: 0,
        },
        targetType: { // 卡牌作用类型，即能够作用在哪一方的
            // 0: 敌方, 1: 己方, 2: 双方
            type: Number,
            default: 0,
        },
        attack: { // 卡牌发动效果 - 造成多少点伤害 - 攻击值
            type: Number,
            default: 0,
        },
        defend: { // 卡牌发动效果 - 给予多少点格挡 - 防御值
            type: Number,
            default: 0,
        },
        duration: { // 卡牌效果持续回合数，如：攻击牌持续时间0，防御牌持续时间1
            type: Number,
            default: 0,
        },
        consume: { // 卡牌发动所需的费用（不管是行动值还是能量）
            type: Number,
            default: 0,
        },
    });
    return Card;
}