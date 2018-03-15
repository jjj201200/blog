/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */
const React = require('react');

module.exports = {
    createScriptTags: function (scriptsArray) {
        const Scripts = [];
        for (let index in scriptsArray) {
            Scripts.push(
                <script
                    key={index}
                    type="text/javascript"
                    src={scriptsArray[index]}
                />
            );
        }
        return Scripts;
    },
    createStyleTags: function (stylesArray) {
        const Styles = [];
        for (let index in stylesArray) {
            Styles.push(
                <link
                    key={index}
                    type="text/css"
                    src={stylesArray[index]}
                />
            );
        }
        return Styles;
    },
};
