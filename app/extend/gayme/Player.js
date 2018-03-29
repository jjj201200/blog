/**
 * Author: Ruo
 * Create: 2018-03-27
 * Description: 玩家对象
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

        this.socket = undefined;

        //战斗参数列表
        this.heal = 100;
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