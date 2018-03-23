/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const GaymePlayer = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        name: {
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
    });
    return mongoose.model('GaymePlayer', GaymePlayer);
}