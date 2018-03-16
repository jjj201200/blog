/**
 * Author: Ruo
 * Create: 2018-03-15
 * Description:
 */

const SCRIPTS = require('./scripts');
const STYLES = require('./styles');
const {createStyleTags, createScriptTags, createMetaTags} = require('./functions');

module.exports = {
    STYLES,
    SCRIPTS,
    createStyleTags,
    createScriptTags,
    createMetaTags,
}