/**
 * Author: Ruo
 * Create: 2018-03-27
 * Description: 玩家对象
 */

class Player {
    constructor({
        app, userId, nickname, cards, sum, win,
    }) {
        this.app = app;
        this.userId = userId;
        this.nickname = nickname;
        this.cardsdata = cards;
        this.sum = sum;
        this.win = win;

        this.state = false;

        // this.inTeam = false;
        this.teamId = undefined;
        this.isLeader = false;

        this.s = undefined;

        //战斗参数列表
        // this.heal = 100;
    }

    set socket(o) {
        this.s = o;
        this.initEvent();
    }

    get socket() {
        return this.s;
    }

    initEvent() {
        const that = this;
        let cacheId = undefined;
        this.socket.on('disconnect',() => {
            /**
             * 离线缓存清理计时器
             * 离线1分钟后删除游戏数据
             */
            cacheId = setTimeout(() => {
                // 清理缓存，发送清理后的玩家列表
                that.app.PlayerManager.removePlayer(that.userId);
            }, 60000);
        });
        this.socket.on('reconnect',() => {
            // 重连上的话，删除离线缓存清理计时器
            if (cacheId) clearTimeout(cacheId);
        });
    }

    //是否在队伍中
    get inTeam() {
        return this.teamId !== undefined;
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

    }

    // 从游戏服务器注销登录
    signOut() {

    }
}