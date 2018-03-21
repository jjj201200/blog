/**
 * Author: Ruo
 * Create: 2018-03-14
 * Description:
 */


const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

const {externals, dllPath} = require('./webpack.config.basic');

const bundle = [
    // 'lodash', // 使用babel-lodash-plugin
    // 'react', // 使用cdn
    // 'react-dom', // 使用cdn
    // 'mobx', // 使用cdn
    // 'mobx-react', // 使用cdn
    // 'styled-components', // 使用cdn
    // 'draft-js', // 使用cdn
    // 'jquery', // 使用cdn
    'react-draft-wysiwyg',
];

const config = {
    entry: {
        // 公共模块
        bundle,
    },
    output: {
        path: dllPath,
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin({
            parallel: true,
        }),
    ]
};

module.exports = {
    config,
    bundle,
};