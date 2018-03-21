/**
 * Author: Ruo
 * Create: 2018-03-21
 * Description: link
 */

import React from 'react';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';

@inject('RouterStore') @observer
export class Link extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }
    onClick() {
        const {RouterStore, href: to} = this.props;
        console.log(RouterStore.go);
        RouterStore.go({to});
    }
    render() {
        const {children, href} = this.props;
        return (
            <button
                href={href}
                onClick={this.onClick}
            >{children}</button>
        )
    }
}