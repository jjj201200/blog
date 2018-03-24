/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

module.exports = app => {
    return app.mongoose.model('Article', app.Schema.Article);
}
