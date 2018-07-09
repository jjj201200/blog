/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;
    const Effect = new Schema({
        id: {
            type: String,
            required: true,
        },
        life: {
            type: Number,
            default: 0,
        }
    },{ _id: false});
    const Card = new Schema({
        name: {
            type: String,
            required: true,
        },
        type: { // 卡牌分类编号，暂时用数字，之后可以用字符串枚举值
            type: Number,
            default: 0,
        },
        effects: [Effect],
        consume: { // 卡牌发动所需的费用（如：行动值还是能量）
            type: Number,
            default: 0,
        },
    });
    return Card;
}