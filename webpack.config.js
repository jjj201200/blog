/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const path = require('path');
const webpack = require('webpack');

const appPath = path.join(process.cwd(), 'app');
const webPath = path.join(process.cwd(), 'web');
const webPagesPath = path.join(webPath, 'pages');

const isDev = process.env.NODE_ENV === 'development';

const entries = {
    home: path.join(webPagesPath, 'home.js'),
};
const entriesArray = [];
for(let key in entries){
    entriesArray.push(entries[key]);
}

module.exports = {
    target: 'web',
    entry: entries,
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                    path.join(__dirname, 'loaders', 'clientEntryLoader.js'),
                ],
                include: entriesArray,
            },
            {
                test: /.(js|jsx)?$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(less)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            /*paths: [
                                path.resolve(__dirname, 'node_modules', 'antd'),
                            ],*/
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            // {
            //     test: /\.(png|jpg|gif|svg|woff)$/,
            //     loader: 'url-loader?limit=30000&name=[name].[ext]',
            // },

            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        alias: { // 这里需要个app.js里保持一致
            DFPages: path.join(webPath, 'pages'),
            DFLibs: path.join(webPath, 'libs'),
            DFUIs: path.join(webPath, 'uis'),
            DFComponents: path.join(webPath, 'components'),
            DFStyles: path.join(webPath, 'styles'),
            DFStores: path.join(webPath, 'stores'),
            DFUtils: path.join(webPath, 'utils'),
            DFPlugins: path.join(webPath, 'plugins'),
        },
        mainFiles: ['index'],
        extensions: ['.js', '.json', '.jsx', '.css', '.less', '.scss', '.sass'],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                RENDER_TYPE: JSON.stringify('client'),
            },
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['mainifest'],
        //     minChunks: 2,
        // }),
    ],
};
