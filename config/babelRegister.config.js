/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const path = require('path');
const appPath = path.join(process.cwd(), 'app');
const webPath = path.join(appPath, 'web');
const viewPath = path.join(appPath, 'view');

module.exports = {
    ignore: false,
    /* ssr模式时想要用es6特性编写页面，并在node环境中进行编译
     * 进而仅将需要编译的目录及其下文件进行配置，其他不作处理 */
    only: [viewPath, webPath],
    passPerPreset: true,
    presets: [
        {
            passPerPreset: false,
            presets: ['es2015', 'stage-0', 'react'],
        },
    ],
    plugins: [
        'transform-runtime',
        'syntax-decorators',
        ['module-alias',[ // 这里需要个webpack.config.js里保持一致
            {src: path.join(webPath, 'pages'), expose: 'DFPages'}, // 客户端页面
            {src: path.join(webPath, 'libs'), expose: 'DFLibs'},
            {src: path.join(webPath, 'components'), expose: 'DFComponents'},
            {src: path.join(webPath, 'styles'), expose: 'DFStyles'},
            {src: path.join(webPath, 'stores'), expose: 'DFStores'},
            {src: path.join(webPath, 'utils'), expose: 'DFUtils'},
            {src: path.join(webPath, 'plugins'), expose: 'DFPlugins'},
            {src: path.join(webPath, 'models'), expose: 'DFModels'},
        ]],
        /* add-module-exports
         * 使得在node端的export变成module.exports让require可以读取
         * 但是在.babelrc中不应该有这个设置，因为其本来就可以使用es6的特性
         */
        'add-module-exports',
        /* transform-decorators-legacy
         * 启用装饰器
         * */
        'transform-decorators-legacy',
        /* 方法绑定操作符 */
        'transform-function-bind',
        'transform-class-properties',
        'transform-object-assign',
    ],
    extensions: [ '.es6', '.es', '.jsx', '.js' ],
};
