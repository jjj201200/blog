/**
 * Author: Ruo
 * Create: 2018-03-18
 * Description:
 */

import _ from 'lodash';
import {observable, action, toJS} from 'mobx';
import {Ajax, inClient, JSON_CONTENT_TYPE} from 'DFUtils';
import {BasicStore, memoryStorage} from './BasicStore';

class GlobalStore extends BasicStore {
    constructor(rootStore) {
        super('GlobalStore', rootStore, [memoryStorage]);
        this.load();
        this.init();

        this.onOpenSnackbar = ::this.onOpenSnackbar;
        this.onColseSnackbar = ::this.onColseSnackbar;

    }

    @observable snackbar = {
        open: false, // snackbar 显示状态
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
        autoHideDuration: 6000,
        onClose: this.onColseSnackbar,
        defaultMessage: 'none message',
        message: 'none message',
        action: [], // 交互渲染区域 eg:button
        onExited: () => {
            this.snackbar.message = this.snackbar.defaultMessage;
        },
    }

    @action
    init() {

    }

    /**
     * 显示反馈提示
     */
    onOpenSnackbar({msg}) {
        this.snackbar.open = true;
        this.snackbar.message = msg;

    }

    /**
     * 隐藏反馈提示
     */
    onColseSnackbar() {
        this.snackbar.open = false;
    }
}

export {GlobalStore};