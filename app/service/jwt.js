/**
 * Author: Ruo
 * Create: 2018-02-23
 * Description:
 */
const Service = require('egg').Service;

class JWTService extends Service {
    constructor(ctx) {
        super(ctx);
        this.currentJwtData = null;
    }



    /**
     *
     * @returns {Promise.<void>}
     */
    async getCurrentJwtData() {
        if (this.currentJwtData) return this.currentJwtData;
        const {ctx} = this;
        const {cookies} = ctx;
        const jwToken = cookies.get('jwt');
        return this.verify(jwToken);
    }

    /**
     * 创建jwt
     * 不需要使用async
     * @param data
     */
    create(data, exp) {
        const {ctx} = this;
        const {cookies, app} = ctx;
        const {secret} = app.config.jwt;
        let exps = exp || Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 1day过期
        const JSONWebToken = app.jwt.sign({exps, data}, secret);
        this.currentJwtData = JSONWebToken.data;
        cookies.set('jwt', JSONWebToken, {maxAge: 38400000});
    }

    /**
     * 校验
     * 不需要使用async
     */
    verify(jwToken) {
        const {ctx} = this;
        const {app} = ctx;
        const {secret} = app.config.jwt;

        try {
            const jwtObject = app.jwt.verify(jwToken, secret); // 判断是否过期
            this.currentJwtData = jwtObject.data;
            return jwtObject.data;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                 this.create({});
                this.currentJwtData = null;
            }
        }
    }
}
module.exports = JWTService;