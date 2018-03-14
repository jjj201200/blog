/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MinifyPlugin = require("babel-minify-webpack-plugin");

const {config, publicPath} = require('./webpack.basic.config');

config.devtool = 'false';
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new UglifyJsPlugin({
        // exclude: /\/web\/store/,
        keep_fnames: true,
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: 'production.analysis.json',
    }),
);

module.exports = config;
