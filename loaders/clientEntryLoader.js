/**
 * Author: Ruo
 * Create: 2018-02-26
 * Description:
 */

module.exports = function(content, map, meta) {
    try {
        return `
            import ReactDOM from 'react-dom';
            import {Provider} from 'mobx-react';
            import createBrowserHistory from 'history/createBrowserHistory';
            import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
            import { Router } from 'react-router';
            import GBS from 'DFStores';
            
            const browserHistory = createBrowserHistory();
            const routingStore = new RouterStore();
            const history = syncHistoryWithStore(browserHistory, routingStore);
            const state = window.__INITIAL_STATE__;
            
            ${content}
            ReactDOM.render(
                <Provider Routing={routingStore} {...GBS.stores}>
                    <Router history={history}>
                        <Index {...state} />
                    </Router>
                </Provider>,
                document.getElementById('root'),
            );
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = ({ isDisabled: true });
        `;
    } catch (err) {
        throw new Error(err);
    }
};
