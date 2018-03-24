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


module.exports = app => {
    let roomIndex = 0;
    return async (ctx, next) => {
        const {players} = app;
        const {socket, service} = ctx;
        // TODO 判断有没有空的房间

        // init socketList
        const {userId, username} = socket.handshake.query;
        if (!players[userId]) {
            players[userId] = {username};
        }
        let player = players[userId]; // 需要缓存的玩家数据

        // init data
        player.sid = socket.id; // 初始化玩家数据

        // init game data
        if (!player.playerData) { // 没有缓存过游戏角色数据
            player.playerData = await service.gayme.player.get(userId);
            if (!player.playerData) { // 没有创建过游戏角色数据
                player.playerData = await service.gayme.player.create({userId, nickname: username});
            }
        }

        // init session
        if (!socket.session) socket.session = {
            id: socket.id,
            // username,
        };

        // init event
        /**
         * clear cache clear clock
         * 重连上的话，删除离线缓存清理计时器
         */
        let cacheId;
        socket.on('disconnect',() => {
            /**
             * 离线缓存清理计时器
             * 离线1分钟后删除游戏数据
             */
            cacheId = setTimeout(() => {
                // 清理缓存，发送清理后的玩家列表
                delete player;
                app.io.to('room0').emit('playerList', app.players);
            }, 60000);
        });
        socket.on('reconnect',() => {
            /**
             * 清理离线缓存清理计时器
             */
            if (cacheId) clearTimeout(cacheId);
        });

        // init room
        socket.join('room0'); // 目前只进入房间room0
        socket.emit('getInitData', {
            roomId: 'room0',
            playerData: player.playerData,
        });
        next();
    };
}