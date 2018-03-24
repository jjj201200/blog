/**
 * Author: Ruo
 * Create: 2018-03-05
 * Description:
 */

import {observable, action} from 'mobx';

export class User {
    constructor({
        id,
        username,
        email,
        loginDate
    } = {
        id,
        username,
        email,
        loginDate
    }) {
        this.set({id, username, email, loginDate});
    }

    @observable id;
    @observable username;
    @observable email;
    @observable loginDate;

    @action('setUser')
    set({id, username, email, loginDate}) {
        this.id = id || this.id ;
        this.username = username ||this.username ;
        this.email = email || this.email ;
        this.loginDate = loginDate || this.loginDate ;
    }
}
