/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const PlayCard = new Schema({
        id: {
            type: Schema.Types.ObjectId,
            ref: 'card',
        },
        number: {
            type: Number,
            default: 0,
        }
    },{ _id: false});

    const PlayerSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
            unique: true,
        },
        nickname: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        sum: Number,
        win: Number,
        cards: [PlayCard],
        loginDate: {type: Date, default: Date.now},
    });
    return PlayerSchema;
}