/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
// const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {config, bundlesPath} = require('./webpack.basic.config');

config.devtool = 'false';
config.plugins.push(
    // 编译文件清理插件
    new CleanWebpackPlugin([bundlesPath], {
        verbose: false,
        exclude: ['Draft.css', 'dll/*.dll.js', 'dll/*.json'],
    }),
    new MinifyPlugin({
        keepFnName: true,
        removeConsole: true,
        removeDebugger: true,
    }, {}),
    new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: 'production.analysis.json',
    }),
);

module.exports = config;
