/**
 * Author: Ruo
 * Create: 2017-11-21
 * Description: webpack 配置页面
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// let replace = require('rollup-plugin-replace');
// let node_modules_dir = path.join(__dirname, 'node_modules')

const [host, port] = ['0.0.0.0', 8088];
const isDev = process.env.NODE_ENV === 'development';
const config = {
    devtool: isDev ? 'source-map' : '',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?quiet=true',
        'babel-polyfill',
        './client/src/index.js',
        // 'webpack/hot/dev-server',
    ],
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: `http://${host}:${port}/build/`,
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js',
    },
    devServer: {
        host,
        port,
        hot: true,
        contentBase: './build',
        publicPath: '/build/',
        inline: true,
        stats: {colors: true},
        staticOptions: {
            redirect: true,
        },
        historyApiFallback: true,
        // watchContentBase: true, // reload a full page
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    resolve: {
        alias: {
            react: `react/umd/react.${isDev ? 'development' : 'production.min'}.js`,
            'react-dom': `react-dom/umd/react-dom.${isDev ? 'development' : 'production.min'}.js`,
            // 'react-router-dom': 'react-router-dom/index.js'
        },
        // modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.(png|jpg|gif|svg|woff)$/,
                loader: 'url-loader?limit=30000&name=[name].[ext]',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/src/index.html',
            filename: 'build/index.html',
        }),
        // new webpack.optimize.CommonsChunkPlugin(
        // /* chunkName= */'vendor', /* filename= */'vendor.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // new webpack.NamedChunksPlugin(),
        // new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
};
module.exports = config;
