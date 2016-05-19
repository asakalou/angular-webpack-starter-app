/**
 * Created by asakalou on 2/14/16.
 */

import './style.less';

import angular from 'angular';

config.$inject = ['$stateProvider'];
function config($stateProvider) {
    $stateProvider.state('app.home', {
        url: '/',
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

export default angular.module('app.home', [])
    .config(config).name