/**
 * Author: Ruo
 * Create: 2018-03-28
 * Description: 牌堆/卡牌管理对象
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
import {observable} from 'mobx';

export class CardManager {
    constructor(owner) {
        this.owner = owner;
        this.cardLibraryData = undefined; // 牌数据库
        this.cardsData = owner.cardsData; // 玩家的牌库
        this.cards = undefined; // 玩家的牌库

        this.drawPile = undefined; // 抽牌堆
        this.discardPile = undefined; // 弃牌堆

        this.init();
    }

    init() {
        this.initEvent();
        this.getCardLibrary();
    }

    initEvent() {
        const that = this;
        const {socket} = this.owner;
        // 9:: get card library data
        socket.off('cardLibrary').on('cardLibrary', (cardLibrary) => {
            console.log(cardLibrary);
            this.cardLibraryData = cardLibrary.data;
            /**
             * 游戏牌库数据有了获取玩家牌库才能进行初始化
             * 所以放在里边
             */
            that.initCards();
        });
    }

    // 实例化牌库中的牌
    initCards() {
        this.cards = _.map(this.cardsData, (o) => {
            const libraryData = _.find(this.cardLibraryData, c => c.id == o.id);
            return Object.assign(o, libraryData);
        })
    }

    /**
     * 修改某张卡牌的数量
     * @param {string} cardId
     * @param {number} number
     */
    modify(cardId, number) {
        if (this.cards[cardId]) {
            this.cards[cardId].number += number;
        }
    }

    getCardLibrary() {
        this.owner.socket.emit('cardLibrary', {method: 'get'});
    }

}