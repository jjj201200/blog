/**
 * Author: Ruo
 * Create: 2018-03-24
 * Description:
 */

import _ from 'lodash';
import {observable, action, autorun, toJS, computed} from 'mobx';
import {Ajax, JSON_CONTENT_TYPE} from 'DFUtils';
import {BasicStore, memoryStorage} from "./BasicStore";
import {Card} from 'DFModels';

export class CardsStore extends BasicStore {
    constructor(rootStore) {
        super('CardsStore', rootStore, [memoryStorage]);
        this.load();
        // this.init();
        this.create = ::this.create;
        this.createNew = ::this.createNew;
        this.update = ::this.update;
        this.delete = ::this.delete;
        this.getCardList = ::this.getCardList;
        // const that = this;
        // const {UserStore} = rootStore.stores;
    }

    TARGET_TYPE = { // 卡牌作用类型枚举值
        0: 'Enemy',
        1: 'Own',
        2: 'Both'
    }

    @observable requestSending = false; // 请求状态，如果在请求中，这个状态可用于置灰按钮

    @observable cardEditor = { // 卡牌编辑器状态
        targetType: 0, // 卡牌目标类型
        type: 0, // 卡牌类型 - 暂且为0
        name: '', // 卡牌名称
        attack: 0, // 卡牌施加伤害效果数值
        defend: 0, // 卡牌施加格挡效果数值
        duration: 0, // 卡牌效果持续回合数
        consume: 0, // 卡牌发动所需的费用
    };

    @observable currentCard = {}; // 当前编辑对象

    @computed
    get currentCardObject() {
        return toJS(this.currentCard);
    }

    cardList = observable.map({}); // 卡牌字典

    deleteCardList = observable.array([]); // 待删除卡牌id数组

    @computed
    get cardListObject() {
        return toJS(this.cardList);
    }

    init() {
        this.currentCard = new Card(this.cardEditor);
        this.getCardList();
    }

    /**
     * 拉取远程卡牌列表并初始化本地列表
     */
    @action
    getCardList() {
        const that = this;
        if (this.requestSending) return;
        this.requestSending = true;
        return Ajax({
            type: 'get',
            url: '/api/cards',
            data: {
                // type: 0,
                method: 'getList',
            },
            dataType: 'json',
            success: (res) => {
                if (res && res.data && res.code === 0) {
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'get card list successfully'
                    });
                    _.forEach(res.data, (value) => {
                        if (!that.cardList.has(value._id)) {
                            // const cardObject = {id: value._id, hasSaved: true, ...value};
                            that.cardList.set(value._id, new Card({id: value._id, hasSaved: true, ...value}));
                        } else if (this.hasSaved) { // 已经在线上保存
                            return;
                        } else {
                            /**
                             * TODO
                             * 本地有数据且没有保存
                             * 处理出具冲突
                             */
                        }
                    });
                }
            },
            fail: (e) => {
                console.error(e);
            },
        }).always(() => {
            this.requestSending = false;
        });
    }

    /**
     * 创建一个新的卡牌对象用于编辑
     */
    @action
    createNew() {
        this.currentCard = new Card({});
    }

    @action
    create() { // 创建新卡牌条目
        const that = this;
        try {
            if (!this.currentCard) {
                throw new Error('no card need to create online');
            }
            if (this.requestSending) return;
            this.requestSending = true;
            const newCard = toJS(this.currentCard);
            console.log(newCard);
            // TODO 参数校验
            // console.log(title, tags, content);
            return Ajax({
                type: 'post',
                url: '/api/cards',
                data: JSON.stringify({
                    ...newCard,
                    method: 'create',
                }),
                contentType: JSON_CONTENT_TYPE,
                dataType: 'json',
                success: (res) => {
                    if (res) {
                        if (res.code === 0) {
                            const {_id: id, ...rest} = res.data;
                            that.currentCard = new Card({
                                id, hasSaved: true, ...rest,
                            });
                            that.cardList.set(id, that.currentCard);
                            // that.initEditorState();
                            this.root.stores.GlobalStore.onOpenSnackbar({
                                msg: 'create card successfully'
                            });
                        } else {
                            this.root.stores.GlobalStore.onOpenSnackbar({
                                msg: res.message.message,
                            });
                        }
                    }
                },
                fail: (res) => {
                    console.error(res);
                },
            }).always(() => {
                this.requestSending = false;
            });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 更新卡牌内容
     * @param cardId
     * @param targetType
     * @param type
     * @param name
     * @param attack
     * @param defend
     * @param duration
     * @param consume
     */
    @action
    update() {
        // TODO 参数校验
        const that = this;
        try {
            if (!this.currentCard) {
                throw new Error('no card need to update');
            }
            if (this.requestSending) return;
            this.requestSending = true;
            const {id: cardId, targetType, type, name, attack, defend, duration, consume} = this.currentCardObject;
            return Ajax({
                type: 'post',
                url: '/api/cards',
                data: JSON.stringify({
                    cardId, targetType, type, name, attack, defend, duration, consume,
                    method: 'update',
                }),
                contentType: JSON_CONTENT_TYPE,
                dataType: 'json',
                success: (res) => {
                    if (res) {
                        if (res.code === 0) {
                            const {_id: id, ...rest} = res.data;
                            console.log(res.data);
                            that.currentCard.set({
                                id, hasSaved: true, ...rest,
                            });
                            this.root.stores.GlobalStore.onOpenSnackbar({
                                msg: 'update card successfully'
                            });
                        } else {
                            this.root.stores.GlobalStore.onOpenSnackbar({
                                msg: res.message.message,
                            });
                        }
                    }
                },
                fail: (res) => {
                    console.error(res);
                },
            }).always(() => {
                this.requestSending = false;
            });
        } catch (e) {
            console.error(e);
        }
    }



    @action
    delete() {
        const that = this;
        if (this.requestSending) return;
        this.requestSending = true;
        const deleteCardList = this.deleteCardList.peek();
        if (deleteCardList.length === 0) return;
        return Ajax({
            type: 'post',
            url: '/api/cards',
            data: JSON.stringify({
                cardIdArray: deleteCardList,
                method: 'delete',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                if (res) {
                    if (res.code === 0) {
                        _.map(deleteCardList, (cardId) => { // 删除成功后清理本地数据
                            that.cardList.delete(cardId); //  清理卡牌列表
                            that.deleteCardList.remove(cardId); // 清理待删除文章id列表
                            if (that.currentCard && that.currentCard.id === cardId) { // 如果被删除卡牌已被打开则也清空
                                that.currentCard = new Card({});
                            }
                        });
                        // if (that.articleList.size === 0) this.deleteModeState = false;
                        // console.log(res);
                        this.root.stores.GlobalStore.onOpenSnackbar({
                            msg: 'delete card(s) successfully',
                        });
                    } else {
                        this.root.stores.GlobalStore.onOpenSnackbar({
                            msg: res.message.message,
                        });
                    }
                }
            },
            fail: (e) => {
                console.error(e);
            },
        }).always(() => {
            this.requestSending = false;
        });
    }
}