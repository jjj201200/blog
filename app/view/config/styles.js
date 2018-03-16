/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */

module.exports = {
    linkTypes: {
        stylesheet: 'text/css',
    },
    development: {
        stylesheet: [
            // draft.js
            'https://cdn.bootcss.com/draft-js/0.10.5/Draft.css',

            // google-font
            'https://fonts.googleapis.com/css?family=Roboto|Geo:400,400i|Monsieur+La+Doulaise|Montserrat:400,700|Mountains+of+Christmas:400,700|Open+Sans+Condensed:300|Press+Start+2P',
        ],
    },
    production: {
        stylesheet: [
            // draft.js
            'https://cdn.bootcss.com/draft-js/0.10.5/Draft.min.css',

            // google-font
            'https://fonts.googleapis.com/css?family=Roboto|Geo:400,400i|Monsieur+La+Doulaise|Montserrat:400,700|Mountains+of+Christmas:400,700|Open+Sans+Condensed:300|Press+Start+2P',
        ],
    },
}