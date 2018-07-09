/**
 * Author: Ruo
 * Create: 2018-03-28
 * Description: 游戏牌库管理对象，不管理玩家的牌库
 */
/**
 * 属性
 * userId
 * 抽牌堆（会变化）
 * 弃牌堆（会变化）
 */
/**
 * 方法
 * 初始化抽牌堆
 * 抽牌
 * 弃牌（直接从抽牌堆移至弃牌堆）
 */

module.exports = class CardManager {
    constructor(app) {
        this.app = app;

        this.list = {};

    }

    /**
     *
     * @returns {Promise}
     */
    async initList() {
        const that = this;
        const list = await this.app.service.gayme.cards.getList();
        return new Promise((resolve) => {
            that.list = _.mapValues(list, o => {
                const {_id: id, __v, ...rest} = o;
                return {id, ...rest};
            });
            resolve();
        });
    }

    /**
     * 返回列表
     */
    async getList() {
        if (!this.list) await this.initList();
        return this.list;
    }

    /**
     * 像传入的socket推送牌库数据
     * @param socket
     */
    pushList(socket) {
        socket.emit('cardLibrary', {method: 'reply', data: this.list});
    }
}
