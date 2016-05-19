/**
 * Created by asakalou on 4/26/16.
 */

import { URLS } from '../../constants';

controller.$inject = ['$scope', '$state', 'authService'];
export default function controller($scope, $state, authService) {
    "use strict";

    var vm = this;
    vm.user = {};

    vm.login = function() {
        vm.error = null;
        authService.login(vm.user, function(message) {
            if (message) {
                vm.error = message;
            } else {
                $state.go('app.home');
            }
        });
    }

}
