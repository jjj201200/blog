/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */

module.exports = app => {
    const {mongoose} = app;
    return mongoose.model('Player', app.Schema.Gayme.Player);
}