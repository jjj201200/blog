/* global module, require */
/**
 * Author: Ruo
 * Create: 2018-01-08
 * Description: 用户对象控制器
 */
// const Cookies = require('js-cookie');
module.exports = app => {
    const {Controller} = app;
    return class UserController extends Controller {
        /**
         * 注册
         */
        async signUp() {
            const {ctx} = this;
            const {service, request} = ctx;
            const createRule = { // 参数校验规则
                username: {type: 'string', required: true},
                password: {type: 'string', required: true},
                confirmPassword: {type: 'string', required: true},
            };
            try {
                ctx.validate(createRule); // 执行校验
                const {username, password, email} = request.body;
                await service.user.signUp(username, password, email);
            } catch (e) {
                ctx.logger.warn(e); // TODO Error handle
                ctx.body = {success: false};
            }
        }

        /**
         * 登录
         */
        async signIn() {
            const {ctx} = this;
            const {service, request} = ctx;
            const createRule = { // 参数校验规则
                username: {type: 'string', required: true},
                password: {type: 'string', required: true},
            };
            try {
                ctx.validate(createRule);
                const {username, password} = request.body;
                await service.user.signIn(username, password);
            } catch (e) {
                ctx.logger.warn(e);
                ctx.body = {success: false};
            }
        }

        /**
         * 注销
         */
        async signOut() {
            const {ctx} = this;
            const {session, service} = ctx;
            if (session.signIn === true) {
                service.user.signOut();
            } else {
                ctx.body = {
                    code: -1,
                    message: 'not sign in',
                };
            }
        }

        /**
         * 获取用户数据
         */
        async getUser() {
            const {ctx} = this;
            const {session, service, cookies} = ctx;
            if (session.signIn !== true) {
                ctx.body = {
                    code: -1,
                    message: 'not sign in',
                };
                return;
            }

            // 已经登录
            const jwToken = cookies.get('jwt');
            if (jwToken) {
                try {
                    const jwtData = service.jwt.verify(jwToken);
                    if (jwtData) {
                        await service.user.getUser(jwtData.username);
                    } else {
                        ctx.body = {
                            code: -1,
                            message: 'not sign in',
                        };
                    }
                } catch (err) {
                    // TODO Error handle
                    console.error(new Error(err));
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: 'not sign in',
                };
            }
        }
    };
};