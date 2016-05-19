/**
 * Created by asakalou on 5/4/16.
 */

import { URLS } from '../constants';


class Principal {

    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }

    resolve() {
        var self = this,
            deferred = this.$q.defer();
        this.$http.get(URLS.userinfo).then(function (r) {
            self.u = r.data;
            deferred.resolve(r.data);
        }, function(response) {
            if (response.status === 401) {
                self.reset();
            }
            deferred.resolve();
        });

        return deferred.promise;
    }

    isLoggedIn() {
        return this.u != null;
    }

    user() {
        return this.u;
    }

    reset() {
        this.u = null;
    }


}
Principal.$inject = ['$http', '$q'];

export default Principal;
