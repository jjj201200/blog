/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description: html 渲染模板
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
        const scriptFilename = componentName.toLowerCase();
        const scriptTags = createScriptTags();
        const styleTags = createStyleTags();
        const metaTags = createMetaTags({title});
        const vendorsUrl = `../${inProduction ? 'public/bundles/' : 'temp/'}vendors.bundle.js`;
        //const dllFileUrl = `../public/dll/bundle.dll${inProduction ? '' : '.dev'}.js`
        const scriptFileUrl = `../${inProduction ? 'public/bundles/' : 'temp/'}${scriptFilename}.bundle.js`
        return (
            <html>
            <head>
                <title>{title}</title>
                <meta content="telephone=no" name="format-detection"/>
                <link rel="manifest" href="../public/bundles/manifest.json"/>
                {metaTags}
                {styleTags}
                {inProduction && scriptTags}
            </head>
            <body>
            <div id="root"/>
            <script type="text/javascript" src={vendorsUrl}/>
            {/*<script type="text/javascript" src={dllFileUrl}/>*/}
            <script type="text/javascript" src={scriptFileUrl}/>
            </body>
            </html>
        );
    }
}
