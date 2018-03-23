/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description: 链接初始化中间件
 */

/**
 * socket链接列表
 * 用于管理制定用户的uid和对应的 socketId
 * 因为socketId每次断链后都会变，在一场游戏中需要始终依赖对应的uid游戏数据来恢复和同步数据（非战斗时数据）
 * @type {{userId: socketId}}
 */
let socketList = {};

module.exports = app => {
    let roomIndex = 0;
    return async (ctx, next) => {
        // 判断有没有空的房间
        const {socket} = ctx;
        /**
         * 初始化
         * socketList
         * session
         */
        // init socketList
        const {username} = socket.handshake.query;
        if (username in socketList) {
            socketList[username] = socket.id;
        }
        // init session
        if (!socket.session) socket.session = {id: socket.id, username};

        // init event
        socket.on('disconnect',() => {
            console.log(`${username}: disconnect`);
            app.io.to('room0').emit('playerList', app.io.sockets.adapter.rooms['room0']);
        });

        // init room
        socket.join('room0'); // 目前只进入房间room0

        socket.emit('getInitData', {
            roomId: 'room0',
        });
        next();
    };
}