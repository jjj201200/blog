/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const path = require('path');
const webpack = require('webpack');
const {config, externals, rootPath, dllPath} = require('./webpack.basic.config');

config.output.path = rootPath; // 内存编译后固定位置 - *不要改动*
config.devtool = 'source-map';
config.externals = externals;
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.DllReferencePlugin({
        context: rootPath,
        manifest: require(path.resolve(dllPath, 'bundle-manifest.json')),
    }),
    new webpack.NamedModulesPlugin(),
);

module.exports = config;
