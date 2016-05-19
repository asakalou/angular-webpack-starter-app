/**
 * Created by asakalou on 4/26/16.
 */

let u = {
    root: '<>'
};

u.login = u.root + '/user/login?grant_type=client_credentials';
u.logout = u.root + '/user/logout';
u.resetPassword = u.root + '/user/resetpassword';
u.forgotPassword = u.root + '/user/forgotpassword';
u.userinfo = u.root + '/user/info';


export var URLS = u;

