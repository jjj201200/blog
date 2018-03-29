/**
 * Author: Ruo
 * Create: 2018-03-27
 * Description: 玩家对象
 */

import io from 'socket.io-client';

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

class Player {
    constructor({
        userId, nickname, cards, sum, win,
    }) {
        this.userId = userId;
        this.nickname = nickname;
        this.cards = cards;
        this.sum = sum;
        this.win = win;

        // this.inTeam = false;
        this.teamId = undefined;
        this.isLeader = false;
    }

    //是否在队伍中
    get inTeam() {
        return this.teamId !== undefined;
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

    // 登录到游戏服务器
    signIn() {
        this.socket = io('http://127.0.0.1:7001/', {
            reconnectionAttempts: 3, // 重连尝试次数
            reconnectionDelay: 5000, // 重连间隔
            forceNew: true,
            query: {
                userId: id,
                username: username,
            },
        });
    }

    // 从游戏服务器注销登录
    signOut() {
        try {
            if (!this.socket) throw 'no socket'; // TODO ERROR
            this.socket.close();
        } catch (e) {
            console.log(e);
        }
    }

    initSocketEvent() {
        try {
            // connect
            this.socket.off('connect').on('connect', function (e) {
                // 成功连接时，打印自己的id
                // if (!that.socket.id) that.socket.id = that.socket.io.engine.id;
                // that.root.stores.GlobalStore.onOpenSnackbar({
                //     msg: `Connect successfully: ${that.socket.id}`,
                // });
                // 初始化
                // that.init();
            });
            // reconnect
            this.socket.off('reconnect').on('reconnect', function (e) {
                // that.init();
                // that.root.stores.GlobalStore.onOpenSnackbar({
                //     msg: 'Reconnect successfully',
                // });
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
            // get player list
            this.socket.off('playerList').on('playerList', (playerList) => {

            });
            // get battle post
            this.socket.off('getBattlePost').on('getBattlePost', (data) => {
                // that.battlePostDialog.receivedPost.postername = data.posterName;
                // that.battlePostDialog.receivedPost.postId = data.postId;
                // that.setPostDialog(true, data.postId, data.posterName);
            });
        } catch (e) {
            console.log(e);
        }
    }

    // 手动重连
    reconnect() {
        try {
            if (this.socket) this.socket.open(() => {
                that.root.stores.CardsStore.getCardList();
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Reconnect successfully',
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

}