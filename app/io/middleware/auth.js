/**
 * Author: Ruo
 * Create: 2018-03-21
 * Description:
 */

module.exports = app => {
    return async (ctx, next) => {
        // console.log(ctx.socket);
        // app.io.emit('res', ctx.socket.id); // broadcast
        // ctx.socket.emit('res', 'connect!'); // broadcast
        // app.io.on('connection', () => { // 连接到服务器的事件
        // });
        await next();
        // execute when disconnect.
        // console.log('disconnection!');
    };
};