/**
 * Author: Ruo
 * Create: 2018-02-26
 * Description:
 */

module.exports = function (content, map, meta) {
    try {
        return `
            import ReactDOM from 'react-dom';
            import {Provider} from 'mobx-react';
            import GBS from 'DFStores';
            const state = window.__INITIAL_STATE__;
            ${content}
            ReactDOM.render(
                <Provider {...GBS.stores}>
                    <Index {...state} />
                </Provider>,
                document.getElementById('root'),
            );
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = ({ isDisabled: true });
        `;
    } catch (err) {
        throw new Error(err);
    }
};
