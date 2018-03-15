/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */

module.exports = {
    development: [
        // react & react-dom
        'https://cdn.bootcss.com/react/16.2.0/umd/react.development.js',
        'https://cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.development.js',

        // jquery
        'https://cdn.bootcss.com/jquery/2.2.4/jquery.js',

        //mobx & mobx-react
        'https://cdn.bootcss.com/mobx/3.5.1/mobx.umd.js',
        'https://cdn.bootcss.com/mobx-react/4.4.1/index.js',

        // styled-component
        'https://cdn.bootcss.com/styled-components/3.1.6/styled-components.js',

        // draft.js
        // 'https://cdn.bootcss.com/draft-js/0.10.5/Draft.js',
    ],
    production: [
        // react & react-dom
        'https://cdn.bootcss.com/react/16.2.0/umd/react.production.min.js',
        'https://cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.production.min.js',

        // jquery
        'https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js',

        // mobx & mobx-react
        'https://cdn.bootcss.com/mobx/3.5.1/mobx.umd.min.js',
        'https://cdn.bootcss.com/mobx-react/4.4.1/index.min.js',

        // styled-component
        'https://cdn.bootcss.com/styled-components/3.1.6/styled-components.min.js',

        // draft.js
        // 'https://cdn.bootcss.com/draft-js/0.10.5/Draft.min.js',
    ]
}