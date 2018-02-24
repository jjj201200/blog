/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
'use strict';

module.exports = app => {
    const {controller, router} = app;
    router.get('/', controller.page.index);
    router.post('/api/signup', controller.user.signUp);
    router.post('/api/signin', controller.user.signIn);
    router.post('/api/signout', controller.user.signOut);
    router.post('/api/getUser', controller.user.getUser);
};
