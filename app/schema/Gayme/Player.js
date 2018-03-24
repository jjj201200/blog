/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

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
        cards: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'card',
        }],
        loginDate: {type: Date, default: Date.now},
    }, { id: false });
    return PlayerSchema;
}