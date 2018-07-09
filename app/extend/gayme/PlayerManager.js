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
const _ = require('lodash');
const Player = require('./Player');

module.exports = class PlayerManager {
    constructor(app) {
        this.app = app;
        this.io = app.io;
        /**
         * socket链接列表
         * 用于管理制定用户的uid和对应的 socketId
         * 因为socketId每次断链后都会变，在一场游戏中需要始终依赖对应的uid游戏数据来恢复和同步数据（非战斗时数据）
         * @type {{userId: socketId}}
         */
        this.list = {};
    }

    /**
     * 返回玩家列表
     */
    getList() {
        return _.mapValues(this.list,
            o => _.pick(o, ['nickname', 'sum', 'win', 'cards']),
        );
    }

    /**
     * 获取玩家数据
     * @param {string} userId
     * @returns {Player}
     */
    getPlayer(userId) {
        return this.list[userId];
    }

    /**
     * 用玩家数据实例化玩家对象，添加到玩家列表
     * @param {Player} player
     * @returns {object} list;
     */
    addPlayer(player) {
        this.list[player.userId] = player;
        return this.list;
    }

    /**
     * 从内存（玩家列表）中删除玩家数据，离线指定的时间长度后执行该方法
     * @param {string} userId
     */
    removePlayer(userId) {
        // const player = this.list[userId];
        this.list[userId] = null;
        this.broadcastPlayerList();
    }

    /**
     * 查询内存中是否已有玩家数据缓存
     * @param userId
     * @returns {boolean}
     */
    hasPlayer(userId) {
        const player = this.playerList[userId];
        return !!player;
    }


    /**
     * 查询玩家数据，没有则创建一条新的
     * 再实例化玩家对象，并返回
     * @param {string} userId
     * @param {string} nickname
     * @returns {Player}
     */
    instantiatePlayer(userId, nickname) {
        let playerData = this.service.gayme.player.get(userId);
        if (!playerData) playerData = this.service.gayme.player.create(userId, nickname);
        return new Player({app: this.app, ...playerData});
    }

    /**
     * 向指定对象发送玩家列表
     * @param to
     */
    broadcastPlayerList(to = '') {
        let io = this.io;
        if (to) io = io.to(to);
        io.emit('playerList', this.getPlayerList());
    }
}