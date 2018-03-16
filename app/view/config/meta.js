/**
 * Author: Ruo
 * Create: 2018-03-16
 * Description:
 */

module.exports = (params) => ({
    name: {
        'theme-color': '#ffffff',
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, minimal-ui',
        // seo
        robots: 'all',
        description: 'The playground for Drowsy Flesh',
        keywords: '没睡醒的肉啊 DrowsyFlesh 哔哩哔哩助手 bilibili bilibilihelper',

        'format-detection': 'no',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black',
        'apple-mobile-web-app-title': params.title,
        'application-name': params.title,
    }
});
