/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const webpack = require('webpack');

const {config} = require('./webpack.basic.config');

config.devtool = 'source-map';
config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
}));
config.plugins.push(new webpack.NamedModulesPlugin());

module.exports = config;
