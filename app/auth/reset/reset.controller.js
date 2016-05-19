/**
 * Created by asakalou on 4/26/16.
 */

import { URLS } from '../../constants';

controller.$inject = ['$scope', '$state', '$stateParams', 'authService'];
export default function controller($scope, $state, $stateParams, authService) {
    "use strict";

    var vm = this;

    vm.title = $state.current.page.title;
    vm.note = $state.current.page.note;

    vm.request = {
        token: $stateParams.token
    };

    vm.submit = function() {
        vm.error = null;
        authService.resetPassword(vm.request, function(errors) {
            if (errors) {
                vm.error = errors.common;
            } else {
                $state.go('app.auth.login');
            }
        });
    }

}
