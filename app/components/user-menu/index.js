/**
 * Created by asakalou on 5/5/16.
 */


directive.$inject = ['principal', 'authService'];
function directive(principal, authService) {
    "use strict";

    return {
        restrict: 'E',
        template: require('./user-menu.html'),
        scope: {},
        link: function(scope, el, attrs) {
            scope.principal = principal;

            scope.logout = function() {
                authService.logout();
            };
        }
    }

}

export default angular.module('app.components.usermenu', [])
    .directive('appUserMenu', directive).name
