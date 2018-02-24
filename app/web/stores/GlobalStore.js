/**
 * Author: Ruo
 * Create: 2018-01-10
 * Description:
 */
// import _ from 'lodash';
import {observable, action, toJS, autorun, extendObservable} from 'mobx';
import {enableLogging} from 'DFPlugins/logger';
import {inClient} from 'DFUtils';

export default class GlobalStore {
    constructor() {
        /* init logger */
        enableLogging({
            predicate: () => inClient(),
            action: true,
            reaction: true,
            transaction: true,
            compute: true,
        })
    }
    @observable stores = {};

    @action
    addStore(SubStore) {
        this.stores[SubStore.name] = new SubStore(this);
    }
}

