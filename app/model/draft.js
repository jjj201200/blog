/**
 * Author: Ruo
 * Create: 2018-03-04
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const DraftSchema = new Schema({
        author: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        tags: [String],
        content: {type: Schema.Types.Mixed},
        saveDate: {type: Date, default: Date.now},
        lastUpdateDate: {type: Date, default: Date.now},
    });
    return mongoose.model('Draft', DraftSchema);
}