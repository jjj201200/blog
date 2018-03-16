/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */

const React = require('react');
const {createStyleTags, createScriptTags, createMetaTags} = require('./config');
// import Cookie from 'js-cookie';
// const {Provider} = require('mobx-react');
// const {StaticRouter} = require('react-router');
// const {ServerStyleSheet} = require('styled-components');

// import 'DFStyles';
const inProduction = process.env.NODE_ENV === 'production';

export default class ClientTemplate extends React.Component {
    // componentWillMount() {
    //     const Component = this.props.Component;
    //     const sheet = new ServerStyleSheet();
    //     sheet.collectStyles(<Component/>);
    //     this.styleSheet = sheet.getStyleElement();
    // }

    render() {
        const {title = 'title1', componentName} = this.props;
        // const Component = this.props.Component;
        const scriptFilename = componentName.toLowerCase();
        const scriptTags = createScriptTags();
        const styleTags = createStyleTags();
        const metaTags = createMetaTags({title});
        // const Style = this.styleSheet;
        return (
            <html>
            <head>
                <title>{title}</title>
                <meta content="telephone=no" name="format-detection"/>
                {/*<link rel="apple-touch-icon" sizes="180x180" href="public/static/apple-touch-icon.png"/>*/}
                {/*<link rel="icon" type="image/png" sizes="32x32" href="public/static/favicon-32x32.png"/>*/}
                {/*<link rel="icon" type="image/png" sizes="16x16" href="public/static/favicon-16x16.png"/>*/}
                {/*<link rel="manifest" href="public/static/manifest.json"/>*/}
                {/*<link rel="mask-icon" href="public/static/safari-pinned-tab.svg" color="#131313"/>*/}
                <link rel="manifest" href="../public/bundles/manifest.json"/>
                {metaTags}
                {styleTags}
                {scriptTags}
            </head>
            <body>
            <div id="root"/>
            <script type="text/javascript" src={`../public/dll/bundle.dll.js`}/>
            {inProduction && <script type="text/javascript" src={`../public/bundles/${scriptFilename}.bundle.js`}/>}
            {!inProduction && <script type="text/javascript" src={`../${scriptFilename}.bundle.js`}/>}
            </body>
            </html>
        );
    }
}
