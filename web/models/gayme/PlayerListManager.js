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

export class PlayerListManager {
    constructor(owner) {
        this.owner = owner;
        this.playerList = {};
        this.initEvent();
    }

    initEvent() {
        const {socket} = this.owner;
        // 6::get player list from server
        socket.off('playerList').on('playerList', (playerList) => {

        });
    }

    getPlayerList() {
        const {socket} = this.owner;
        socket.emit('playerList', {
            method: 'get',
        });
    }
}