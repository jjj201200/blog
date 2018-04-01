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
        socket.emit('connectSuccessfully', {
            code: 0,
            msg: 'connect successfully',
        });
        next();
    };
}