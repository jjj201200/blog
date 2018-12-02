/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */
const React = require('react');
const STYLES = require('./styles');
const SCRIPTS = require('./scripts');
const META = require('./meta');

const scriptTags = SCRIPTS[process.env.NODE_ENV];
const styleTags = STYLES[process.env.NODE_ENV];

module.exports = {
    createScriptTags: function() {
        const Scripts = [];
        for (let index in scriptTags) {
            Scripts.push(
                <script
                    key={index}
                    type="text/javascript"
                    src={scriptTags[index]}
                />,
            );
        }
        return Scripts;
    },
    createStyleTags: function() {
        const Styles = [];
        for (let type in styleTags) {
            const links = styleTags[type];
            for (let i in links) {
                Styles.push(
                    <link
                        key={`${type}-${i}`}
                        type={STYLES.linkTypes[type]}
                        rel={type}
                        href={links[i]}
                    />,
                );
            }
        }
        return Styles;
    },
    createMetaTags: function(params) {
        const metaData = META(params);
        const Metas = [];
        for (let type in metaData) {
            const metas = metaData[type];
            for (let i in metas) {
                const dynamicType = {[type]: i};
                Metas.push(
                    <meta
                        key={type + '-' + i}
                        {...dynamicType}
                        content={metas[i]}
                    />,
                );
            }
        }
        return Metas;
    },
};
