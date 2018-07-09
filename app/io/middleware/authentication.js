/**
 * Author: Ruo
 * Create: 2018-03-29
 * Description: 注册账号组件
 */
module.exports = app => {
    return async (ctx, next) => {
        const {PlayerManager: PM} = app;
        const {socket} = ctx;

        if (socket.needAuth) { // 如果被标记需要注册新数据到服务器内存
            const {userId, username} = socket.session;
            const player = PM.instantiatePlayer(userId, username);
            PM.addPlayer(player);
        }
        const {userId, nickname, sum, win, cards} = PM.getPlayer(userId);
        socket.emit('connect', { // 登录成功
            code: 0,
            msg: 'connect successfully',
            data: {userId, nickname, sum, win, cards},
        });
        next();
    };
}