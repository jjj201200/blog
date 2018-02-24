/**
 * Author: Ruo
 * Create: 2018-01-02
 * Description: 入口
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import {Router, browserHistory} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {AppContainer} from 'react-hot-loader';
import {Home} from './js/pages';

import './sass/index.scss';


const renderApp = (App) => {
    ReactDOM.render(
        <AppContainer>
            <App/>
        </AppContainer>,
        document.getElementById('root'),
    );
};
renderApp(Home);

if (module.hot) {
    module.hot.accept('./js/pages', () => {
        renderApp(Home);
    });
}
