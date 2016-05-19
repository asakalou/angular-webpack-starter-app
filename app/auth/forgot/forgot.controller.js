/**
 * Created by asakalou on 4/26/16.
 */

import { URLS } from '../../constants';

controller.$inject = ['$scope', '$state', 'authService', 'growl'];
export default function controller($scope, $state, authService, growl) {
    "use strict";

    var vm = this;



    vm.submit = function() {
        vm.error = null;

        authService.forgotPassword(vm.email, function(errors) {
            if (errors) {
                vm.error = errors.common;
            } else {
                $state.go('app.auth.login');
            }
        });

    }

}
