/* global module, require */
/**
 * Author: Ruo
 * Create: 2018-01-08
 * Description: 用户对象控制器
 */
// const Cookies = require('js-cookie');
module.exports = app => {
    const {Controller, mongoose} = app;
    return class UserController extends Controller {
        async signUp() {
            const {ctx} = this;
            const {service} = ctx;
            const createRule = { // 参数校验规则
                username: {type: 'string', required: true},
                password: {type: 'string', required: true},
                confirmPassword: {type: 'string', required: true},
            };
            try {
                ctx.validate(createRule); // 执行校验
                await service.user.signUp();
            } catch (e) {
                ctx.logger.warn(e);
                ctx.body = {success: false};
            }
        }

        async signIn() {
            const {ctx} = this;
            const {service} = ctx;
            const createRule = { // 参数校验规则
                username: {type: 'string', required: true},
                password: {type: 'string', required: true},
            };
            try {
                ctx.validate(createRule);
                await service.user.signIn();
            } catch (e) {
                ctx.logger.warn(e);
                ctx.body = {success: false};
            }
        }

        async signOut() {
            const {ctx} = this;
            const {session, service, cookies} = ctx;
            if (session.signIn === true) {
                service.user.signOut();
            } else {
                ctx.body = {code: -1, message: 'not sign in'};
            }
        }

        async getUser() {
            const {ctx} = this;
            const {session, service, cookies} = ctx;
            if (session.signIn !== true) {
                ctx.body = {
                    code: -1,
                    message: 'not sign in',
                };
            } else {
                const jwToken = cookies.get('jwt');
                if (jwToken) {
                    try{
                        const jwtData = service.jwt.verify(jwToken);
                        if (jwtData.data) {
                            await service.user.getUser(jwtData.data.username);
                        } else {
                            ctx.body = {
                                code: -1,
                                message: 'not sign in'
                            }
                        }
                    } catch (err) {
                        console.error(new Error(err));
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        message: 'not sign in'
                    }
                }

            }
        }


    };
};