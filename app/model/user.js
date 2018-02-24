/* global require, module */
/**
 *
 * Author: Ruo
 * Create: 2018-01-08
 * Description: 用户数据表
 */
module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;
    /**
     * @param username {String}
     * @param password {String}
     * @param email {String}
     * @param loginDate {Date}
     */
    const UserSchema = new Schema({
        username: {type: String},
        password: {type: String},
        email: {type: String},
        loginDate: {type: Date},
    });
    const User = mongoose.model('User', UserSchema);
    return User;
}
