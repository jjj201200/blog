/**
 * Author: Ruo
 * Create: 2018-01-22
 * Description: react 模板渲染引擎
 */

const React = require('react');
const ReactDOMServer = require('react-dom/server');

class ReactRenderEngine {
    render(fileName, locals) { // render file
        const reactClass = require(fileName);
        return Promise.resolve(this.renderString(reactClass, locals));
    }

    renderToMarkUp(fileName, locals) {
        const reactClass = require(fileName);
        return Promise.resolve(this.renderToStaticMarkUp(reactClass, locals));
    }

    renderString(reactClass, locals) {
        return ReactDOMServer.renderToString(React.createElement(reactClass, locals));
    }

    renderToStaticMarkUp(reactClass, locals) {
        return ReactDOMServer.renderToStaticMarkUp(React.createElement(reactClass, locals));
    }
}

module.exports = ReactRenderEngine;