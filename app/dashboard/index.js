/**
 * Created by asakalou on 2/14/16.
 */

import './style.css';

import angular from 'angular';

config.$inject = ['$stateProvider'];
function config($stateProvider) {
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        views: {
            'main@' : {
                template: require('./index.html'),
                controller: controller
            }
        }
    })
}

controller.$inject = ['$scope', 'blockUI'];
function controller($scope, blockUI) {

}

export default angular.module('app.dashboard', [])
    .config(config).name