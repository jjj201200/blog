/**
 * Author: Ruo
 * Create: 2018-03-27
 * Description: 玩家对象
 */

import io from 'socket.io-client';
import {observable} from 'mobx';
import {PlayerListManager} from './PlayerListManager';
import {CardManager} from './CardManager';

/**
 * 属性
 * userId
 * 昵称 {string}
 * 持有卡牌列表 {array<{cardId, number}>}
 * 游戏总场次 {number}
 * 胜场次 {number}
 *
 * 是否已加入队伍 {boolean}
 * 加入的队伍 - teamId
 * 队伍中的职位，是否为队长 {boolean}
 */

/**
 * 战斗参数表
 * 牌堆管理器
 * 生命值
 */

/**
 * 方法
 * 加入队伍 [teamId]
 * 退出队伍
 * 开始对局（处于队伍之中，且是队长）
 * 退出对局（处于队伍之中，且是队长）
 * 从游戏服务器注销登录
 */

export class Player {
    constructor({
        stores, userId, nickname, cards, sum, win,
    }) {
        this.stores = stores;
        this.userId = userId;
        this.nickname = nickname;
        this.cardsdata = cards;
        this.sum = sum;
        this.win = win;

        this.state = false; // sign in state

        this.team = undefined;
        this.isLeader = false;

        this.socket = undefined;
    }

    @observable playerManager = undefined;
    @observable cardManager = undefined;

    @observable hasEdited = false; // 玩家数据是否被修改该过

    //是否在队伍中
    get inTeam() {
        return this.teamId !== undefined;
    }

    // @returns {Battle}
    get battle() {
        if (!this.inTeam) return undefined;
        if (!this.team.inBattle) return undefined;
        return this.team.battle;
    }

    // @returns {boolean}
    get inBattle() {
        if (!this.inTeam) return undefined;
        return this.team.inBattle;
    }

    // 创建队伍
    createTeam() {

    }

    /**
     * 加入队伍
     * @param teamId
     */
    joinTeam(teamId) {

    }

    // 退出已加入的队伍
    quitTeam() {

    }

    // 开始已加入的对局
    startBattle() {

    }

    // 退出对局
    quitBattle() {

    }

    // 初始化socket事件
    initSocketEvent() {
        this.initDefaultEvent();
        this.initBattleEvent();
    }

    // 默认socket事件
    initDefaultEvent() {
        // connect 连接成功
        const that = this;
        const {GlobalStore} = this.stores;
        this.socket.off('connect').on('connectSuccessfully', function (res) {
            // 成功连接时，打印自己的id
            if (!that.socket.id) that.socket.id = that.socket.io.engine.id;

            const {userId, nickname, sum, win, cards: cardsData} = res;
            Object.assign(that, {userId, nickname, sum, win, cardsData})
            if (that.socket && that.socket.connected) {
                that.initSocketEvent(); // 初始化socket事件
                that.playerManager = new PlayerListManager(that);
                that.cardManager = new CardManager(that);
            }

            GlobalStore.onOpenSnackbar({
                msg: `Connect successfully: ${that.socket.id}`,
            });
            // 初始化
        });
        // reconnect
        this.socket.off('reconnect').on('reconnect', function (e) {
            GlobalStore.onOpenSnackbar({
                msg: 'Reconnect successfully',
            });
            // that.init();
            // connectTimeoutCounter = 0;
        });
        // disconnect
        this.socket.off('disconnect').on('disconnect', function (e) {
            // that.playerList = {};
            // that.root.stores.GlobalStore.onOpenSnackbar({
            //     msg: 'Disconnect successfully',
            // });
            // connectTimeoutCounter = 0;
        });
        // connect timeout
        this.socket.off('connect_timeout').on('connect_timeout', function (e) {
            // that.root.stores.GlobalStore.onOpenSnackbar({
            //     msg: 'Connect timeout: ' + (++connectTimeoutCounter) + 'time',
            // });
        });
    }

    // 战斗相关事件
    initBattleEvent() {
        // get or send battle post
        this.socket.off('battlePost').on('battlePost', (data) => {
            // that.battlePostDialog.receivedPost.postername = data.posterName;
            // that.battlePostDialog.receivedPost.postId = data.postId;
            // that.setPostDialog(true, data.postId, data.posterName);
        });
    }

    // 链接到socket
    connect() {
        const {UserStore} = this.stores;
        if (!this.socket || !this.socket.connected) { // 已经登录
            const {id, username} = UserStore.currentUser;
            this.socket = io('http://127.0.0.1:7001/', {
                reconnectionAttempts: 3, // 重连尝试次数
                reconnectionDelay: 5000, // 重连间隔
                forceNew: true,
                query: {
                    userId: id,
                    username: username,
                },
            });
        } else { // 没有登录
            this.stores.GlobalStore.onOpenSnackbar({
                msg: 'please sign in first',
            });
        }
    }

    // 手动重连
    reconnect() {
        const {GlobalStore, CardsStore} = this.stores;
        if (this.socket) this.socket.open(() => {
            CardsStore.getCardList();
            GlobalStore.onOpenSnackbar({
                msg: 'Reconnect successfully',
            });
        });
    }

    // 断开连接
    disconnect() {
        const that = this;
        if (this.socket) {
            this.socket.disconnect(() => {
                that.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Disconnect successfully',
                });
                that.playerList.clear();
            });
        }
    }
}