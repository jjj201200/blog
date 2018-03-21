/**
 * Author: Ruo
 * Create: 2018-03-20
 * Description: router store
 */

import url from 'url';
import _ from 'lodash';
import {observable, action} from 'mobx';
import {BasicStore, memoryStorage} from './BasicStore';
import {Route} from 'DFModels';

export class RouterStore extends BasicStore {
    constructor(rootStore) {
        super('RouterStore', rootStore, [memoryStorage]);
        this.load();
    }

    @observable route = null; // Route 现在的存贮route对象

    @observable routesOption = {}; //  所有Route配置对象，键名为path

    routeQueue = observable.shallowArray([]); // route 队列

    // queueMaxLength = 30; // TODO 路由队列最大长度, 暂时不设定队列长度

    @observable params = {}; // 地址存贮的参数

    /**
     *
     * @param {Route} from 当前路由对象
     * @param {string} to
     */
    @action
    go({from = this.route, to = ''}) {
        try {
            let currentUrlObj;
            if (this.route) { // 如果创建过路由
                this.routeQueue.push(from);
                this.route.disable = true;
                currentUrlObj = from;
            } else { // 如果没有创建过
                currentUrlObj = url.parse(location.href);
            }
            if (to) { // 如果有目标
                const nextUrlObj = currentUrlObj.resolve(currentUrlObj.href, to);
                if (this.checkOptions(to)) { // 目标地址有配置
                    const option = this.routeQueue[to];
                    this.route = new Route({
                        preUrlObj: currentUrlObj,
                        urlObj: nextUrlObj,
                        component: option.component,
                        disable: false,
                    });
                } else { // 没有配置，直接跳转

                }
            } else throw 'no target url';
        } catch (e) {
            console.error(new Error(e));
        }
    }

    checkOptions(path) {
        return path in this.routeQueue;
    }
}
