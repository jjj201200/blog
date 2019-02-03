/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;

    const ArticleSchema = new Schema({
        authorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        title: {
            type: String,
            required: true,
            //lowercase: true,
            trim: true,
        },
        summary: {
            type: Schema.Types.Mixed,
        },
        tags: [String],
        content: {type: Schema.Types.Mixed},
        publishDate: {type: Date}, // 第一次发布时间
        lastUpdateDate: {type: Date, default: Date.now}, // 最后一次更新时间
        hasPublished: {type: Boolean, default: false}, // 是否已经发布
    });
    return mongoose.model('Article', ArticleSchema);
}
