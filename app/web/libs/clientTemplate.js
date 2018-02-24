/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */

const React = require('react');
// import Cookie from 'js-cookie';
// const {Provider} = require('mobx-react');
// const {StaticRouter} = require('react-router');
// const {ServerStyleSheet} = require('styled-components');

// import 'DFStyles';


export default class ClientTemplate extends React.Component {
    // componentWillMount() {
    //     const Component = this.props.Component;
    //     const sheet = new ServerStyleSheet();
    //     sheet.collectStyles(<Component/>);
    //     this.styleSheet = sheet.getStyleElement();
    // }

    render() {
        const {title = 'title1', ComponentName, styleSheet} = this.props;
        // const Component = this.props.Component;
        const scriptFilename = ComponentName.toLowerCase();
        // const Style = this.styleSheet;
        return (
            <html>
            <head>
                <title>{title}</title>
                {/*<meta charset="utf-8" />*/}
                <meta name="robots" content="all"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui"/>
                <meta content="yes" name="apple-mobile-web-app-capable"/>
                <meta content="black" name="apple-mobile-web-app-status-bar-style"/>
                {/*<meta content="QNA,blockchain" name="keywords"/>*/}
                {/*<meta content="A new platform that fairly compensates users for their contributions using on blockchain technology" name="description"/>*/}
                <meta content="telephone=no" name="format-detection"/>
                {/*<link rel="apple-touch-icon" sizes="180x180" href="public/static/apple-touch-icon.png"/>*/}
                {/*<link rel="icon" type="image/png" sizes="32x32" href="public/static/favicon-32x32.png"/>*/}
                {/*<link rel="icon" type="image/png" sizes="16x16" href="public/static/favicon-16x16.png"/>*/}
                {/*<link rel="manifest" href="public/static/manifest.json"/>*/}
                {/*<link rel="mask-icon" href="public/static/safari-pinned-tab.svg" color="#131313"/>*/}
                <meta name="apple-mobile-web-app-title" content={title}/>
                <meta name="application-name" content={title}/>
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto|Geo:400,400i|Monsieur+La+Doulaise|Montserrat:400,700|Mountains+of+Christmas:400,700|Open+Sans+Condensed:300|Press+Start+2P"
                    rel="stylesheet"/>
                <link href="/public/Draft.css" rel="stylesheet"/>
                {/*<meta name="theme-color" content="#131313"/>*/}
                {/*{Style}*/}
            </head>
            <body>
            <div id="root"/>
            <script src={`${scriptFilename}.js`}></script>
            </body>
            </html>
        );
    }
}
