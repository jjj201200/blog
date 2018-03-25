/**
 * Author: Ruo
 * Create: 2018-03-24
 * Description:
 */

import {observable, action, autorun, toJS} from 'mobx';
import {Ajax} from 'DFUtils';
import io from 'socket.io-client';
import {BasicStore, memoryStorage} from "./BasicStore";

export class CardsStore extends BasicStore {
    constructor(rootStore) {
        super('CardsStore', rootStore, [memoryStorage]);
        this.load();
        const that = this;
        const {UserStore} = rootStore.stores;
    }

    @observable requestSending = false; // 请求状态，如果在请求中，这个状态可用于置灰按钮

    @observable cardEditor = { // 卡牌编辑器状态
        inputs: {
            targetType: 0, // 卡牌目标类型
            name: '', // 卡牌名称
            type: 0, // 卡牌类型 - 暂且为0
            attack: 0, // 卡牌施加伤害效果数值
            defend: 0, // 卡牌施加格挡效果数值
            duration: 0, // 卡牌效果持续回合数
        }, // 编辑框的状态
        currentTarget: {}, // 当前编辑对象
    };

    @action
    create() { // 创建新卡牌条目
        const that = this;
        try {
            if (!this.cardEditor.currentTarget) {
                throw new Error('no card need to create online');
            }
            if (this.requestSending) return;
            this.requestSending = true;
            const {tempId, title, tags, content} = this.article;
            // TODO 参数校验
            // console.log(title, tags, content);
            return Ajax({
                type: 'post',
                url: '/api/article',
                data: JSON.stringify({
                    title, tags, content,
                    method: 'create',
                }),
                contentType: JSON_CONTENT_TYPE,
                dataType: 'json',
                success: (res) => {
                    if (res && res.code === 0) {
                        const {_id: id, ...rest} = res.data;
                        that.article = new Article({
                            id, hasSavedOnline: true, ...rest,
                        });
                        that.articleList.delete(tempId);
                        that.articleList.set(id, that.article);
                        that.initEditorState();
                        this.root.stores.GlobalStore.onOpenSnackbar({
                            msg: 'create article successfully'
                        });
                        console.log(that.article);
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
}