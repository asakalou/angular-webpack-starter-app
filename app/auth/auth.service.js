/**
 * Created by asakalou on 4/26/16.
 */

import { URLS } from '../constants';

service.$inject = ['$http', '$state', '$window'];
export default function service($http, $state, $window) {
    "use strict";

    return {
        login: function (params, callback) {
            return $http.post(URLS.login, null, {
                params: {
                    client_id: params.email,
                    client_secret: params.password
                }
            }).success(function (r) {
                $window.localStorage.token = r.access_token;
                callback();
            }).error(function (r) {
                callback(r.error_description);
            });
        },

        logout: function (callback) {
            return $http.post(URLS.logout)
                .success(function () {
                    $state.go('app.auth.login');
                });
        },

        resetPassword: function (request, callback) {
            return $http.post(URLS.resetPassword, null, {
                params: request
            }).success(function (r) {
                callback(r);
            });
        },

        forgotPassword: function (email, callback) {
            return $http.post(URLS.forgotPassword, null, {
                params: {email: email}
            }).success(function (r) {
                callback(r.errors);
            });
        }
    };


}
