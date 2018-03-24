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
}