/**
 * Author: Ruo
 * Create: 2018-01-10
 * Description:
 */
// import _ from 'lodash';
import {observable, action, toJS, autorun, extendObservable} from 'mobx';
import {enableLogging} from 'DFPlugins/logger';
import {BasicStore, memoryStorage} from './BasicStore';
import {inClient} from 'DFUtils';

export default class GlobalStore extends BasicStore{
    constructor(subStoresArray) {
        super('GlobalStore', null, [memoryStorage]);
        /* init logger */
        enableLogging({
            predicate: () => inClient(),
            action: true,
            reaction: false,
            transaction: false,
            compute: false,
        })
        for (let index in subStoresArray) {
            this.addStore(subStoresArray[index]);
        }
    }
    @observable stores = {};

    @action
    addStore(SubStore) {
        this.stores[SubStore.name] = new SubStore(this);
    }
}

