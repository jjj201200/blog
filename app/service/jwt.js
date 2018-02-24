/**
 * Author: Ruo
 * Create: 2018-02-23
 * Description:
 */
const Service = require('egg').Service;

class JWTService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * 创建jwt
     * @param data
     * @returns {Promise.<void>}
     */
    async create(data, exp) {
        const {ctx} = this;
        const {cookies, app} = ctx;
        const {secret} = app.config.jwt;
        let exps = exp || Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 1day过期
        const JSONWebToken = app.jwt.sign({exps, data}, secret);
        await cookies.set('jwt', JSONWebToken, {maxAge: 38400000});
    }

    /**
     * 校验
     * @returns {Promise.<void>}
     */
    verify() {
        const {ctx} = this;
        const {cookies, app} = ctx;
        const {secret} = app.config.jwt;
        const jwToken = cookies.get('jwt');
        try {
            return app.jwt.verify(jwToken, secret); // 判断是否过期
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                this.create({});
            }
        }
    }
}
module.exports = JWTService;