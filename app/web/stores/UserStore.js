/* eslint-disable import/extensions */
/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: 存储用户数据的store
 */
// import Cookies from 'js-cookie';
import {observable, action, runInAction} from 'mobx';
import {Ajax} from 'DFUtils';
import {inClient} from 'DFUtils';
import {BasicStore, memoryStorage} from './BasicStore';

class User {
    constructor({username = null, email = null, loginDate = null} = {username: null, email: null, loginDate: null}) {
        this.set({username, email, loginDate});
    }

    @observable username = null;
    @observable email = null;
    @observable loginDate = null;

    @action('setUser')
    set({username, email, loginDate}) {
        this.username = username;
        this.email = email;
        this.loginDate = loginDate;
    }
}

class UserStore extends BasicStore {
    constructor(rootStore) {
        super('UserStore', rootStore, [memoryStorage]);
        this.load(); // 先尝试载入本地数据
        this.init();
    }

    @action('init')
    init() {
        // if (!inClient()) return;
        this.store.set('hasLogin', false);
        let user = this.store.get('currentUser');
        if (!user) {
            this.getUser();
        } else {
            this.store.set('currentUser', new User(user));
        }
    }

    @action('getUser')
    getUser() {
        return Ajax({
            type: 'post',
            url: '/api/getUser',
            success: (res) => {
                if (res.code !== 0) {
                    //TODO
                } else {
                    const user = res.data;
                    this.store.set('currentUser', new User(user));
                    this.updateLoginStatus(true);
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
                console.log(res);
            },
        });
    }

    /**
     * 注册
     * @param params
     */
    @action('signUp')
    signUp(params) { // TODO 参数校验
        Ajax({
            type: 'post',
            url: '/api/signup',
            data: {...params},
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLoginStatus(true);
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
                console.log(res);
            },
        });
    }

    /**
     * 登录
     * @param params
     */
    @action('signIn')
    login(params) { // TODO 参数校验
        Ajax({
            type: 'post',
            url: '/api/signin',
            data: params,
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLoginStatus(true);
                    console.log(res);
                    this.updateCurrentUser({...res.data});
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
            },
        });
    }

    /**
     * 登出
     */
    @action('logout')
    logout() {
        Ajax({
            type: 'post',
            url: '/api/signout',
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLoginStatus(false);
                    this.updateCurrentUser({
                        username: '',
                        email: '',
                        loginDate: '',
                    });
                    console.log(res);
                }
            },
            fail: (res) => {
                this.updateLoginStatus(false);
            },
        });

    }

    /**
     * 更新登录状态变量
     * @param hasLogin
     */
    @action('updateLoginStatus')
    updateLoginStatus(hasLogin) {
        this.store.set('hasLogin', hasLogin);
    }

    /**
     * 更新当前登录用户信息
     * @param username
     * @param email
     * @param loginDate
     */
    @action('updateCurrentUser')
    updateCurrentUser({username, email, loginDate}) {
        const currentUser = this.store.get('currentUser');
        if (currentUser)
            currentUser.set({username, email, loginDate});
        else this.store.set('currentUser', new User({username, email, loginDate}));
    }
}

export default UserStore;
