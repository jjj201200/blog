/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: store基础类，自动本地持久化
 */
import {observable, action, reaction, toJS} from 'mobx';
import engine from 'store/src/store-engine';
import sessionStorage from 'store/storages/sessionStorage';
import cookieStorage from 'store/storages/cookieStorage';
import localStorage from 'store/storages/localStorage';
import memoryStorage from 'store/storages/memoryStorage';
import expirePlugin from 'store/plugins/expire';
// import {inClient} from 'DFUtils';

class BasicStore {
    hasInitialed = false; // 是否初始化过
    hasLoaded = false; // 是否载入过本地持久化数据
    store = observable.map({}); // 仓库
    /**
     * @param rootStore
     * @param storeLibs
     * @param expireMilliSecond 用于设定cookie存储模式下的过期时间
     */
    constructor(storeNameSpace, rootStore = null, storeLibs = [ // 数据持久化类型
        memoryStorage,
        cookieStorage,
    ], expireMilliSecond = 0) {
        this.name = storeNameSpace;
        this.root = rootStore;
        this.storeLib = engine.createStore(storeLibs, [
            expirePlugin,
        ]); // 创建数据持久化对象
        this.expireMilliSecond = expireMilliSecond;
        // 初始化
        // this.init();
        // 载入本地持久化数据
        // if (!process.node) this.load();
        reaction(() => { // 数据函数
            return JSON.stringify(toJS(this.store));
        }, (store) => { // 效果函数
            if (this.hasInitialed) this.save(store);
            else this.hasInitialed = true;
        });
    }

    /**
     * 参数初始化函数
     * 会判断是否有load过
     */
    @action('init')
    init() {
    }

    @action('save')
    save(storeJSON) {
        this.storeLib.set(`DFStore ${this.name}`, storeJSON);
    }

    @action('load')
    load() {
        if (!process.node) return; // ssr阶段没有storage
        // if (!inClient()) return; // ssr阶段没有storage
        const jsonStr = this.storeLib.get(`DFStore ${this.name}`);
        if (jsonStr && jsonStr.length > 0) {
            const json = JSON.parse(jsonStr);
            this.store.merge(json); // 载入本地数据
            this.hasLoaded = true;
        }
    }
}

export {
    BasicStore,
    localStorage,
    sessionStorage,
    memoryStorage,
    cookieStorage,
};