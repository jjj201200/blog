/**
 *
 * Author: Ruo
 * Create: 2018-01-08
 * Description: 用户数据表
 */
module.exports = app => {
    const {mongoose} = app;
    const {Schema} = mongoose;
    const UserSchema = new Schema({
        username: {type: String, unique: true},
        password: {type: String},
        email: {type: String},
        loginDate: {type: Date, default: Date.now},
    });
    return UserSchema;
}
