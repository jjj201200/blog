/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description:
 */

import _ from 'lodash';
import {observable, action, autorun, toJS, computed} from 'mobx';
import {Ajax, JSON_CONTENT_TYPE} from 'DFUtils';
import io from 'socket.io-client';
import {BasicStore, memoryStorage} from "./BasicStore";
import {Player, Card} from 'DFModels';

/**
 * Gayme游戏框架的变量仓库
 */
export class GaymeStore extends BasicStore {
    constructor(rootStore) {
        super('GaymeStore', rootStore, [memoryStorage]);
        this.load();
        const that = this;
        const {UserStore} = rootStore.stores;

        this.selectPlayer = ::this.selectPlayer;
        this.acceptBattlePost = ::this.acceptBattlePost;
        this.denyBattlePost = ::this.denyBattlePost;

        this.updatePlayerCard = ::this.updatePlayerCard;
        autorun(() => {
            // 用户没有登录 且 socket已经连接
            if (!UserStore.userInitialed && that.socket && that.socket.connected) {
                that.disconnect();
            }
        })
    }

    socket = null; // 本地socket对象

    roomId = null; // 进入的房间号

    player = null; // 玩家数据

    @observable requestSending = false; // 请求状态，如果在请求中，这个状态可用于置灰按钮

    @observable.shallow playerList = {}; // 大厅的玩家列表

    @observable clickedPlayer = new Player(); // 被点击的玩家，用来查看玩家的数据

    @observable cardList = [];

    // @computed
    // get clickedPlayerObject() {
    //     return toJS(this.clickedPlayer);
    // }

    @observable battlePostDialog = { // 存储挑战相关的数据
        open: false,
        // defaultMessage: '',
        // message: '',
        posterName: undefined, // 挑战发起者的nickname
        postId: undefined, // 挑战发起者的userId
        receivedPost: {
            posterName: undefined,
            postId: undefined,
        }
    };

    init() {
        const that = this;
        // 获取初始化游戏数据
        this.socket.off('getInitData').on('getInitData', (initData) => {
            that.roomId = initData.roomId;
            console.log(`${'roomId'.padEnd(6, ' ')} ${initData.roomId}`);

            // 初始化牌库列表
            that.root.stores.CardsStore.getCardList().done((res) => {
                /**
                 * code: 0,
                 * data: {
                 *  0:  {
                 *          _id: 0,
                 *
                 *      }
                 * }
                 */
                that.cardList = res.data;

                // 初始化玩家列表
                that.getPlayerList(initData.roomId);
            });

            // const {userId: id, userId, nickname, sum, win, cards} = initData.playerData;
            // that.player = new Player({id, sid: that.socket.id, userId, nickname, sum, win, cards});
            // console.log(initData);


            // .done((res) => {
            // _.each(that.playerList, (player) => {
            //     const {userId: id, userId, nickname, sum, win, cards} = player;
            //     that.playerList[id] = new Player({id, sid: that.socket.id, userId, nickname, sum, win, cards});
            //     // that.playerList[id].set({cards: res.data});
            // });
            // if (that.clickedPlayer.id === that.root.stores.UserStore.currentUser.id) {
            //     that.player = that.playerList[id];
            // }
            // that.clickedPlayer = that.player;
            // });
        });

        // 收到挑战申请
        this.socket.off('getBattlePost').on('getBattlePost', (data) => {
            that.battlePostDialog.receivedPost.postername = data.posterName;
            that.battlePostDialog.receivedPost.postId = data.postId;
            that.setPostDialog(true, data.postId, data.posterName);
        });

        // 连接超时提示
        let connectTimeoutCounter = 0;
        this.socket.off('connect_timeout').on('connect_timeout', function (e) {
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Connect timeout: ' + (++connectTimeoutCounter) + 'time',
            });
        });

        this.socket.off('reconnect').on('reconnect', function (e) {
            that.init();
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Reconnect successfully',
            });
            connectTimeoutCounter = 0;
        });

        this.socket.off('disconnect').on('disconnect', function (e) {
            that.playerList = {};
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Disconnect successfully',
            });
            connectTimeoutCounter = 0;
        });
    }

    getPlayerList(roomId) {
        const that = this;
        // const {UserStore} = this.root.stores;
        this.socket.emit('livingRoom', {method: 'getPlayerList', data: {roomId}});
        this.socket.off('playerList').on('playerList', (playerList) => {
            /**
             * {
             *  userId: {
             *          username: '',
             *          sid: '', // socketId
             *          playerData: {
             *              cards:[],
             *              loginDate: '',
             *              nickname: '',
             *              sum: 0,
             *              userId: '',
             *              win: 0,
             *              _id: '', // userId
             *          }
             *      }
             * }
             */
            console.table(playerList);
            that.playerList = playerList; // 原对象

            // 将原对象初始化为 player列表
            _.each(playerList, (playerObject, userId) => {
                const {sid, username: nickname} = playerObject;
                const {sum, win, cards = []} = playerObject.playerData;
                const cardList = [];
                // console.log(that.cardList, cards);
                // init cards
                _.each(that.cardList, (card) => { // 遍历卡牌库
                    const array = {...card, number: 0};
                    const ownCard = _.filter(cards, (o) => o.id === card._id)[0];
                    if (!_.isEmpty(ownCard)) { // 如果当前遍历到的玩家有这张牌，则覆盖这张卡牌的数量
                        console.log(ownCard);
                        array.number = ownCard.number;
                    }
                    array.id = array._id;
                    delete array._id;
                    cardList.push(array);
                });
                console.log(cardList);

                that.playerList[userId] = new Player({id: userId, sid, nickname, sum, win, cards: cardList});
                if (userId === that.root.stores.UserStore.currentUser.id) {
                    that.player = that.playerList[userId];
                }
            });
        });
    }

    /**
     * 发送挑战请求
     * @param targetId 想要挑战的目标的userId
     */
    sendBattlePost(targetId) {
        const postId = this.socket.id;
        console.log(this.root.stores.UserStore.currentUser);
        const posterName = this.root.stores.UserStore.currentUser.username;
        this.socket.emit('livingRoom', {
            method: 'sendBattlePost',
            data: {
                targetId,
                postId,
                posterName,
            },
        });
    }

    // 接受挑战请求
    acceptBattlePost() {
        // const that = this;
        this.socket.emit('livingRoom', {
            method: 'acceptBattlePost',
            data: {
                postId: this.battlePostDialog.postId,
                posterName: this.battlePostDialog.posterName,
            },
        });
    }

    // 拒绝请求
    denyBattlePost() {
        this.socket.emit('livingRoom', {
            method: 'denyBattlePost',
            data: {
                postId: this.battlePostDialog.postId,
                posterName: this.battlePostDialog.posterName,
            },
        });
    }

    @action
    selectPlayer(userId) {
        this.clickedPlayer = this.playerList[userId];
    }

    @action
    updatePlayerCard() {
        const that = this;
        if (this.requestSending) return;
        this.requestSending = true;
        const playerCards = toJS(this.player.cards).list; // 玩家被填充过的卡牌列表
        const newCardList = _.filter(playerCards, (card) => (card.number !== 0)); // 过滤掉不持有卡牌后的卡牌列表
        const requestCardList = _.map(newCardList, (card) => { // 生成用于更新提交的数据结构
            const {id, number} = card;
            return {id, number};
        });
        console.log(requestCardList);
        Ajax({
            type: 'post',
            url: '/api/player',
            data: JSON.stringify({
                data: {
                    userId: that.player.id,
                    cardsArray: requestCardList,
                },
                method: 'updateCards',
            }),
            contentType: JSON_CONTENT_TYPE,
            success: (res) => {
                console.log(res);
                that.player.cards.hasEdited = false;
            },
            fail: (res) => {
                console.log(res);
            },
        }).always((e) => {
            this.requestSending = false;
        });
    }

    setPostDialog(open, postId, posterName) {
        this.battlePostDialog.open = open;
        this.battlePostDialog.postId = postId;
        this.battlePostDialog.posterName = posterName;
    }

}