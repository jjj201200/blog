/**
 * Author: Ruo
 * Create: 2018-03-27
 * Description: 玩家列表管理对象
 */

/**
 * 属性
 * 在线玩家列表 {userId: Player, }
 *
 */
/**
 * 方法
 * 添加玩家 {userId}
 * 踢玩家下线 {userId}
 * 从内存中获取玩家数据 {userId}
 * 从内存中删除玩家数据 {userId}
 */

class PlayerManager {
    constructor(owner) {
        this.o = owner;
        this.playerList = {};
    }

    initPlayerListEvent() {
        try {
            const {socket} = this.o;
            // get player list
            socket.off('playerList').on('playerList', (playerList) => {

            });
        }catch (e) {

        }
    }

    getPlayerList() {
        try {
            const {sokcet} = this.o;
            sokcet.emit('livingRoom', {
                method: 'getPlayerList',
                data: {roomId}
            });
        } catch (e) {
            console.error(e);
        }
    }
}