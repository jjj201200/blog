/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
'use strict';

module.exports = app => {
    const {controller, router} = app;
    router.get('/', controller.page.index);
    // TODO router.get('/blog', controller.page.blog);
    router.post('/api/sign_up', controller.user.signUp);
    router.post('/api/sign_in', controller.user.signIn);
    router.post('/api/sign_out', controller.user.signOut);
    router.post('/api/get_user', controller.user.getUser);

    // 文章
    router.get('/api/article', controller.article.index);
    router.post('/api/article', controller.article.index);
};
