/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
'use strict';

module.exports = app => {
    // const {controller, router, io} = app;
    const {controller, router} = app;
    // socket.io 这里匹配的是接受事件名
    // io.of('/').route('livingRoom', io.controller.livingRoom.index);

    router.get('/', controller.page.index);
    router.get('/gayme', controller.page.gayme);
    // TODO router.get('/blog', controller.page.blog);
    router.post('/api/sign_up', controller.user.signUp);
    router.post('/api/sign_in', controller.user.signIn);
    router.post('/api/sign_out', controller.user.signOut);
    router.post('/api/get_user', controller.user.getUser);

    // 文章
    router.get('/api/article', controller.article.index);
    router.post('/api/article', controller.article.index);
};
