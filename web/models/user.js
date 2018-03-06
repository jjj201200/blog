/**
 * Author: Ruo
 * Create: 2018-03-05
 * Description:
 */

import {observable, action} from 'mobx';

class User {
    constructor({
        username = null,
        email = null,
        loginDate = null
    } = {
        username: null,
        email: null,
        loginDate: null
    }) {
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

export {User};