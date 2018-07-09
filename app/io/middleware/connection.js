/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description: 链接初始化中间件
 */

module.exports = app => {
    return async (ctx, next) => {
        const {PlayerManager} = app;
        const {socket, service} = ctx;

        // init socketList
        const {userId, username} = socket.handshake.query;
        socket.session = {userId, username};
        let player = PlayerManager.hasPlayer(userId);
        if (player) { // 服务器缓存中已经存在，恢复登录
            player = PlayerManager.getPlayer(userId);
            player.socket = socket; // 重连够更新socket对象
        } else {
            socket.needAuth = true;
        }
        next();
    };
}