/**
 * Author: Ruo
 * Create: 2018-02-09
 * Description:
 */

const koaJwt = require('jsonwebtoken');

module.exports = options => {
    // return koaJwt(options);
    return async function jwt(ctx, next) {
        await next();

        const jwToken = ctx.cookies.get('jwt');
        if (jwToken) {
            const res = koaJwt.verify(jwToken, options.secret, (err, decode) => {
                console.log(err, decode);
            });
        }

    }
};
