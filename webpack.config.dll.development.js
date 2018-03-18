/**
 * Author: Ruo
 * Create: 2018-03-14
 * Description:
 */

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

const {externals, dllPath} = require('./webpack.config.basic');

module.exports = {
    entry: {
        // 公共模块
        bundle: [
            // 'lodash', // 使用babel-lodash-plugin
            'react',  // 使用cdn
            'react-dom', // 使用cdn
            'mobx', // 使用cdn
            'mobx-react', // 使用cdn
            'styled-components', // 使用cdn
            'draft-js', // 使用cdn
            'jquery', // 使用cdn
            'react-draft-wysiwyg',
        ],
    },
    output: {
        path: dllPath,
        filename: '[name].dll.dev.js',
        library: '[name]_library'
    },
    // externals: externals,
    plugins: [
        // 清理编译目录
        new CleanWebpackPlugin([dllPath], {
            verbose: false,
            exclude: ['bundle.dll.js'],
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            path: path.resolve(dllPath, '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new UglifyJsPlugin({
            parallel: true,
        }),
    ]
};