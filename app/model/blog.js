/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const BlogSchema = new Schema({
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
        publishDate: {type: Date, default: Date.now},
        lastUpdateDate: {type: Date, default: Date.now},
    });
    return mongoose.model('Blog', BlogSchema);
}