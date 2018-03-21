/* eslint-disable import/extensions */
/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: 存储用户数据的store
 */
// import Cookies from 'js-cookie';
import {observable, action} from 'mobx';
import {Ajax, inClient} from 'DFUtils';
import {BasicStore, memoryStorage} from './BasicStore';
import {User} from 'DFModels';

export class UserStore extends BasicStore {
    constructor(rootStore) {
        super('UserStore', rootStore, [memoryStorage]);
        this.load(); // 先尝试载入本地数据
        this.init();
    }

    get hasSignIn() {
        return this.store.get('hasSignIn');
    }

    set hasSignIn(value) {
        this.store.get('hasSignIn', value);
    }

    get currentUser() {
        return this.store.get('currentUser');
    }

    set currentUser(value) {
        this.store.get('currentUser', new User(value));
    }

    @observable requestSending = false;

    @action('initUserStore')
    init() {
        // if (!inClient()) return;
        this.store.set('hasSignIn', false);
        let user = this.currentUser;
        if (!user) {
            this.getUser();
        } else {
            this.store.set('currentUser', new User(user));
        }
    }

    @action('getUser')
    getUser() {
        if (this.requestSending) return;
        this.requestSending = true;
        return Ajax({
            type: 'post',
            url: '/api/get_user',
            success: (res) => {
                if (res.code !== 0) {
                    //TODO
                } else {
                    const user = res.data;
                    this.store.set('currentUser', new User(user));
                    this.updateLoginStatus(true);
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'sign in successfully'
                    });
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
                console.log(res);
            },
        }).done(() => {
            this.requestSending = false;
        });
    }

    /**
     * 注册
     * @param params
     */
    @action
    signUp(params) {
        // TODO 参数校验
        if (this.requestSending) return;
        this.requestSending = true;
        Ajax({
            type: 'post',
            url: '/api/sign_up',
            data: {...params},
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLoginStatus(true);
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'sign up successfully'
                    });
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
                console.error(res);
            },
        }).done(() => {
            this.requestSending = false;
        });
    }

    /**
     * 登录
     * @param params
     */
    @action('signIn')
    login(params) { // TODO 参数校验
        if (this.requestSending) return;
        this.requestSending = true;
        Ajax({
            type: 'post',
            url: '/api/sign_in',
            data: params,
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLoginStatus(true);
                    // console.log(res);
                    this.updateCurrentUser({...res.data});
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'sign in successfully'
                    });
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
                console.error(res);
            },
        }).done(() => {
            this.requestSending = false;
        });
    }

    /**
     * 登出
     */
    @action
    logout() {
        if (this.requestSending) return;
        this.requestSending = true;
        Ajax({
            type: 'post',
            url: '/api/sign_out',
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLoginStatus(false);
                    this.updateCurrentUser({
                        username: '',
                        email: '',
                        loginDate: '',
                    });
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'sign out successfully'
                    });
                    console.log(res);
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
                console.error(res);
            },
        }).done(() => {
            this.requestSending = false;
        });

    }

    /**
     * 更新登录状态变量
     * @param hasSignIn
     */
    @action
    updateLoginStatus(hasSignIn) {
        this.store.set('hasSignIn', hasSignIn);
    }

    /**
     * 更新当前登录用户信息
     * @param username
     * @param email
     * @param loginDate
     */
    @action
    updateCurrentUser({username, email, loginDate}) {
        const currentUser = this.store.get('currentUser');
        if (currentUser)
            currentUser.set({username, email, loginDate});
        else this.store.set('currentUser', new User({username, email, loginDate}));
    }
}
