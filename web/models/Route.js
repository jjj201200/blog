/**
 * Author: Ruo
 * Create: 2018-03-20
 * Description:
 */

import url from 'url';
import React from 'react';
import {observable, action} from 'mobx';


export class Route {
    constructor({preUrlObj, urlObj, component, disable = true}) {
        try {
            this.previousUrlObj = preUrlObj;
            this.component = component;
            this.urlObj = urlObj;
            this.disable = disable;
        } catch (e) {
            console.error(new Error(e));
        }
    }

    previousPath = null;

    @observable urlObj = null;

    @observable component = null;

    @action
    go({from = this.href, target = '/'}) {
        try {
            return url.parse(url.resolve(from, target));
        } catch (e) {
            console.error(new Error(e));
        }
    }

    // string
    get href() {
        return this.urlObj && this.urlObj.href;
    }

    // string
    get protocol() {
        return this.urlObj && this.urlObj.protocol;
    }

    // string
    get hostname() {
        return this.urlObj && this.urlObj.hostname;
    }

    // string
    get port() {
        return this.urlObj && this.urlObj.port;
    }

    // string
    get host() {
        return this.urlObj && this.urlObj.host;
    }

    // string
    get auth() {
        return this.urlObj && this.urlObj.auth;
    }

    // Concatenation of pathname and search
    get path() {
        return this.urlObj && this.urlObj.path;
    }

    // string
    get pathname() {
        return this.urlObj && this.urlObj.pathname;
    }

    // string
    get search() {
        return this.urlObj && this.urlObj.search;
    }

    // object
    get query() {
        return this.urlObj && this.urlObj.query;
    }
}