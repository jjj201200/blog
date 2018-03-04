/**
 * Author: Ruo
 * Create: 2018-02-09
 * Description:
 */

const Service = require('egg').Service;

class UserService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    setUserSession(userData, filterList) {
        const {ctx} = this;
        const {session} = ctx;
        for (let key in userData) {
            if (filterList && filterList[key] !== undefined) return;
            session[key] = userData[key];
        }
    }

    deleteUserSession() {
        this.ctx.session = null;
    }

    signOut() {
        const that = this;
        const {ctx} = this;

        that.deleteUserSession(); // 清除session
        ctx.service.jwt.create({}, Math.floor(Date.now() / 1000)); // 设置空的过期的jwt
        ctx.body = {code: 0, message: 'sign out successfully'};
    }

    async getUser(username) {
        const {ctx} = this;
        const {User} = ctx.model;
        await User.findOne({username}).exec((err, user) => {
            console.log('findOne', err, user);
            if (err) {
                //TODO
            } else {
                const {username, email, loginDate} = user;
                ctx.body = {
                    code: 0,
                    data: {username, email, loginDate},
                };
            }
        });
    }

    /**
     * 用户注册服务
     * @returns {Promise.<void>}
     */
    async signUp() {
        const that = this;
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {User} = model;
        try {
            if (!User) throw new Error('no model user');
            const requestBody = ctx.request.body;
            const searchUser = await User.findOne({username: requestBody['username']});
            if (searchUser) { // 已经注册过了
                ctx.body = {code: -1, message: 'has user'};
            } else {
                const newUser = new User({ // 新用户实例
                    ...requestBody,
                    loginDate: helper.currentTime,
                });
                await newUser.save().then((newUser) => { // 插入新用户到数据库
                    const {username, email, loginDate} = newUser;
                    service.jwt.create({username, email, loginDate}); // 创建登录凭据
                    that.setUserSession({signIn: true}); // 设置登录状态
                    ctx.body = {code: 0, message: 'sign up successfully'};
                }).catch((e) => {
                    ctx.body = {code: -1, message: e};
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 用户登录服务
     * @returns {Promise.<void>}
     */
    async signIn() {
        const that = this;
        const {ctx} = this;
        const {service, model} = ctx;
        const {User} = model;
        if (User) {
            const {username, password} = ctx.request.body; // 获取请求数据
            // const user = await this.updateSignInDate(username, password); // 登录并更新登录信息
            try {
                const user = await User.findOne({username, password});
                if (user) { // 查询到用户
                    const {email} = user;
                    const loginDate = (new Date).getTime() + 8 * 3600000;
                    user.set({loginDate}); // 设置登录时间 8*1h - 时区
                    await user.save().then((updatedUser) => {
                        that.setUserSession({signIn: true});
                        service.jwt.create({username, email, loginDate}); // 更新jwt
                        ctx.body = {code: 0, data: {username, email, loginDate}};
                    }).catch((err) => {
                        ctx.throw(500, {code: -1, err});
                    });
                } else {
                    ctx.body = {code: -1, message: 'no user'};
                }
            } catch (e) {
                ctx.throw(500, {code: -1, e});
            }

        }
    }
}

module.exports = UserService;
