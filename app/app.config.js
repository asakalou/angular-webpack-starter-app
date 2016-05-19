/**
 * Created by asakalou on 2/14/16.
 */

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'growlProvider', '$injector'];

export function config($stateProvider, $urlRouterProvider, $locationProvider, growlProvider, $injector) {
    "use strict";

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    growlProvider.globalTimeToLive(5000);
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalDisableIcons(true);


    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get('$state');
        $state.go('app.dashboard', {}, {reload: true});
    });

    $stateProvider.state('app', {
        url: '',
        abstract: true,
        views: {
            'topNav@': {
                template: require('./nav/top-nav.html')
            }
        },
        data: {
            auth: {required: true}
        }
    });
}

function proceedRouteEvent($state, $rootScope, event, toState, toParams, fromState, fromParams) {
    $state.go(toState.name, toParams, {notify: false}).then(function () {
        $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
    });
}

run.$inject = ['$rootScope', '$state', '$urlRouter', 'principal'];
export function run($rootScope, $state, $urlRouter, principal) {
    "use strict";

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        event.preventDefault();

        principal.resolve().then(function () {
            if (_.get(toState, 'data.auth.required')) {

                if (!principal.isLoggedIn()) {
                    $state.go('app.auth.login');
                    return;
                }

                proceedRouteEvent($state, $rootScope, event, toState, toParams, fromState, fromParams);

            } else {
                if (principal.isLoggedIn()) {
                    if (!_.get(toState, 'data.auth.loggedInRestricted')) {
                        proceedRouteEvent($state, $rootScope, event, toState, toParams, fromState, fromParams);
                    } else {
                        $state.go('app.dashboard');
                    }

                } else {
                    proceedRouteEvent($state, $rootScope, event, toState, toParams, fromState, fromParams);
                }
            }
        });
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {

    });
}

