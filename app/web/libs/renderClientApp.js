/**
 * Author: Ruo
 * Create: 2018-02-08
 * Description: 客户端入口
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'mobx-react';
import {Router} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';

import GBS from 'DFStores';

const isDev = process.env.NODE_ENV === 'development';

export const renderClientApp = (Component) => {
    ReactDOM.render(
        <Provider {...GBS.stores}>
            {/*<BrowserRouter>*/}
                <Component renderType="client"/>
            {/*</BrowserRouter>*/}
        </Provider>,
        document.getElementById('root'),
    );
};
