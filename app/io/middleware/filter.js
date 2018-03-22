/**
 * Author: Ruo
 * Create: 2018-03-21
 * Description:
 */

module.exports = app => {
    return async (ctx, next) => {
        ctx.socket.emit('res', 'packet received!');
        // console.log('packet:', ctx.packet);
        await next();
    };
};