/**
 * Author: Ruo
 * Create: 2018-03-26
 * Description:
 */

import _ from 'lodash';
import {observable, action} from 'mobx';
import {Card} from 'DFModels';

export class CardList {
    constructor(cardList) {
        const that = this;
        if (cardList) {
            _.each(cardList, (card) => {
                const {id, ...rest} = card;
                that.list[id] = new Card({id, ...rest});
            });
        }
    }

    @observable list = {};

    @observable hasEdited = false;

    /**
     * 设置卡牌列表里的卡牌
     * @param cardId
     * @param params
     * @param number
     */
    set(cardList) {
        try {
            _.each(cardList, (o) => {
                if (this.list[o._id]) {
                    this.list[o._id].number = o.number;
                }
            })

        } catch (e) {
            console.error(e);
        }
    }

    add(cardId, number) {
        try {
            if (this.list[cardId]) {
                this.list[cardId].number += number;
                this.hasEdited = true;
            }
        } catch (e) {
            console.error(e);
        }
    }

    subtract(cardId, number) {
        try {
            if (this.list[cardId]) {
                if (this.list[cardId].number === 0) return;
                this.list[cardId].number -= number;
                this.hasEdited = true;
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export class Player {
    constructor({
                    id,
                    sid,
                    nickname,
                    sum = 0,
                    win = 0,
                    cards = [],
                } = {
        id,
        sid,
        nickname,
        sum: 0,
        win: 0,
        cards: [],
    }) {
        this.set({id, sid, nickname, sum, win, cards});
    }

    @observable id;
    @observable sid;
    @observable nickname; // 玩家昵称
    @observable sum = 0; // 玩家游戏总场次
    @observable win = 0; // 玩家游戏胜场次
    @observable cards = new CardList(); // 玩家卡牌对象

    // local params

    set({id, sid, nickname, sum, win, cards}) {
        if (id !== undefined) this.id = id;
        if (sid !== undefined) this.sid = sid;
        if (nickname !== undefined) this.nickname = nickname;
        if (sum !== undefined) this.sum = sum;
        if (win !== undefined) this.win = win;
        if (cards !== undefined) this.cards = new CardList(cards);
    }
}