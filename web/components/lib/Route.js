/**
 * Author: Ruo
 * Create: 2018-03-21
 * Description:
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('RouterStore') @observer
export class Route extends React.Component {
    @observable disable = true;
    constructor(props) {
        super(props);
        try {
            if (props.path) props.RouterStore.routesOption[path] = {disable: this.disable, ...props};
            else throw 'no path';
        } catch (e) {
            console.error(new Error(e));
        }
    }

    render() {
        const {RouterStore, path} = this.props;
        const {route} = RouterStore;
        if (route === path && !route.disable) {
            return route.component;
        } else return '';
    }
}
