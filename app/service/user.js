/**
 * Author: Ruo
 * Create: 2018-02-09
 * Description:
 */

const Service = require('egg').Service;

// 文章对象允许返回的字段
const UserReturnKeys = [
    'username',
    'email',
];
const UserReturnString = UserReturnKeys.join(' ');

/**
 * 用户模型
 */
class UserService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * 注册
     * @param {string} username
     * @param {string} password
     * @param {string} email
     */
    async signUp(username, password, email) {
        const that = this;
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {User} = model;
        try {
            const searchUser = await User.findOne({username}).select(UserReturnString);
            if (searchUser) { // 已经注册过了
                // TODO 标准的错误处理
                ctx.body = {code: -1, message: 'has user'};
            } else {
                const loginDate = helper.currentTime;
                const user = new User({ // 新用户实例
                    username, password, email, loginDate,
                });
                await user.save().then((newUser) => { // 插入新用户到数据库
                    const {username, email} = newUser;
                    service.jwt.create({username, email}); // 创建登录凭据
                    that.setUserSession({username, signIn: true}); // 设置登录状态
                    ctx.body = {
                        code: 0,
                        message: 'sign up successfully',
                        data: {username, email, loginDate},
                    };
                }).catch((e) => {
                    // TODO 标准的错误处理
                    ctx.body = {code: -1, message: e};
                });
            }
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
        }
    }

    /**
     * 登录
     * @param {string} username
     * @param {string} password
     */
    async signIn(username, password) {
        const that = this;
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {User} = model;
        if (User) {
            try {
                const user = await User.findOne({username, password}).select(UserReturnString);
                if (user) { // 查询到用户
                    const {email} = user;
                    const loginDate = helper.currentTime;
                    user.set({loginDate}); // 设置登录时间
                    await user.save().then(() => {
                        that.setUserSession({username, signIn: true});
                        service.jwt.create({username, email, loginDate}); // 更新jwt
                        ctx.body = {code: 0, data: {username, email, loginDate}};
                    }).catch((err) => {
                        // TODO 标准的错误处理
                        ctx.throw(500, {code: -1, err});
                    });
                } else {
                    // TODO 标准的错误处理
                    ctx.body = {code: -1, message: 'no user'};
                }
            } catch (e) {
                // TODO 标准的错误处理
                ctx.throw(500, {code: -1, e});
            }
        }
    }

    /**
     * 登出
     * 清空session，重置空的过期的jwt
     */
    signOut() {
        const {ctx} = this;
        const {service, helper} = ctx;

        this.deleteUserSession(); // 清除session
        service.jwt.create({}, helper.currentTime - 1); // 设置空的过期的jwt
        ctx.body = {code: 0, message: 'sign out successfully'};
    }

    /**
     * 通过用户名获取用户数据
     * @param {string} username
     */
    async getUser(username) {
        const that = this;
        const {ctx} = this;
        const {User} = ctx.model;
        try {
            await User.findOne({username}).select(UserReturnString).exec((err, user) => {
                if (err) {
                    //TODO 标准的错误处理
                    console.error(err);
                } else if (user) {
                    const {username, email} = user;
                    that.setUserSession({username, signIn: true});
                    ctx.body = {
                        code: 0,
                        data: {username, email},
                    };
                } else {
                    ctx.body = {
                        code: -1,
                        message: 'no user',
                    };
                }
            });
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
        }
    }

    /**
     * 设置用户的session
     * @param userData 用来设置的对象
     * @param filterList 用来过滤的数组，其中包含的字段是需要被过滤掉的
     */
    setUserSession(userData, filterList) {
        const {ctx} = this;
        const {session} = ctx;
        for (let key in userData) {
            if (filterList && filterList[key] !== undefined) return;
            session[key] = userData[key];
        }
    }

    /**
     * 清空用户的session数据
     */
    deleteUserSession() {
        this.ctx.session = null;
    }
}

module.exports = UserService;
