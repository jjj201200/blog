/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    return app.mongoose.model('Card', app.Schema.Gayme.Card);
}