/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const Card = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        type: Number, // 卡牌分类编号，暂时用数字，之后可以用字符串枚举值
        targetType: {
            type: Number,
            required: true,
        }, // 卡牌作用类型，即时能够作用在哪一方的
        attack: Number, // 卡牌发动效果 - 造成多少点伤害 - 攻击值
        defend: Number, // 卡牌发动效果 - 给予多少点格挡 - 防御值
    });
    return Card;
}