/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */
const React = require('react');

module.exports = {
    createScriptTag: function (scriptsArray) {
        const Scripts = [];
        for (let index in scriptsArray) {
            Scripts.push(
                <script
                    key={index}
                    crossorigin
                    charset="utf-8"
                    type="text/javascript"
                    src={scriptsArray[index]}
                />
            );
        }
        return Scripts;
    }
};
