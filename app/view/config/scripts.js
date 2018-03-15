/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */

module.exports = {
    development: [
        // react
        'https://unpkg.com/react@16/umd/react.development.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.development.js',

        // jquery
        'http://code.jquery.com/jquery-2.2.4.js'
    ],
    production: [
        // react
        'https://unpkg.com/react@16/umd/react.production.min.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',

        // jquery
        'http://code.jquery.com/jquery-2.2.4.min.js',
    ]
}