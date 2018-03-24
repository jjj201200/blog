/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
'use strict';

module.exports = app => {
    const {router, io} = app;
    const {page, user, article} = app.controller;
    const {livingRoom, connection} = io.controller;
    // socket.io 这里匹配的是接受事件名
    io.of('/').route('livingRoom', livingRoom.index);

    router.get('/', page.index);
    router.get('/gayme', page.gayme);
    router.get('/cards', page.cards);
    // TODO router.get('/blog', page.blog);
    router.post('/api/sign_up', user.signUp);
    router.post('/api/sign_in', user.signIn);
    router.post('/api/sign_out', user.signOut);
    router.post('/api/get_user', user.getUser);

    // 文章
    router.get('/api/article', article.index);
    router.post('/api/article', article.index);
};
