/**
 *
 * Author: Ruo
 * Create: 2018-01-08
 * Description: 用户数据表
 */
module.exports = app => {
    return app.mongoose.model('User', app.Schema.User);
}
