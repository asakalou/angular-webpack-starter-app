/**
 * Created by asakalou on 4/26/16.
 */

import angular from 'angular';

export default function interceptor() {
    "use strict";

    this.noLoginRedirectsUrls = [];
    this.authNotRequiredUrls = [];

    var self = this;

    this.$get = ['$window', '$q', function($window, $q) {
        return {

            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';

                var addAuthHeader = !isExcluded(self.authNotRequiredUrls, config.url) && $window.localStorage.token;

                if (addAuthHeader) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                }

                return config;
            },

            response: function (response) {
                return response;
            },

            responseError: function (rejection) {
                if (rejection.status === 401) {
                    if (!isExcluded(self.noLoginRedirectsUrls, rejection.config.url)) {
                        delete $window.localStorage.token;
                    }
                }
                return $q.reject(rejection);
            }

        };
    }];



    function isExcluded(excludedUrls, url) {
        for (var i = 0; i < excludedUrls.length; ++i) {
            var excludedUrl = excludedUrls[i];
            if (url.indexOf(excludedUrl) >= 0) {
                return true;
            }
        }
        return false;
    }


}