import {observable, action, toJS} from 'mobx';
import {Article} from 'DFModels';
import {BasicStore} from 'DFStores/BasicStore';
import {Ajax} from 'DFUtils';
import {JSON_CONTENT_TYPE} from 'DFUtils';

/**
 * Author: DrowsyFlesh
 * Create: 2019/2/3
 * Description:
 */
export class ArticlePageStore extends BasicStore {
    constructor(rootStore) {
        super('BlogStore', rootStore, [localStorage]);
    }

    @observable requestSending = false;

    @observable article = new Article({id: 0, title: 404});

    /**
     * 获取指定文章id的数据
     * @param {string} articleId
     */
    @action
    getArticle(articleId) {
        if (this.requestSending) return;
        this.requestSending = true;
        return Ajax({
            type: 'get',
            url: '/api/article',
            data: {
                articleId,
                method: 'get',
            },
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                if (res.code === 0 && res.data) {
                    // console.log(res.data);
                    const {_id, authorId, ...other} = res.data;
                    const articleObject = {id: _id, hasSavedOnline: true, author: authorId, ...other};
                    this.article = new Article(articleObject);
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'get article successfully',
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
}
