/**
 * Created by asakalou on 4/26/16.
 */

import './style.less';

import angular from 'angular';

import { URLS } from '../constants';

import loginController from './login/login.controller.js';
import forgotController from './forgot/forgot.controller.js';
import resetController from './reset/reset.controller.js';

import authService from './auth.service';
import authInterceptor from './interceptors/auth.interceptor';
import principal from './principal';


config.$inject = ['$httpProvider', '$stateProvider', 'authInterceptorProvider'];
function config($httpProvider, $stateProvider, authInterceptorProvider) {
    authInterceptorProvider.noLoginRedirectUrls = [URLS.login, URLS.logout];
    authInterceptorProvider.authNotRequiredUrls = [URLS.login];

    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider
        .state('app.auth', {
            abstract: true,
            views: { 'topNav@': { template: '' } },
            data: {
                auth: {
                    required: false,
                    loggedInRestricted: true
                }
            }
        })

        .state('app.auth.login', {
            url: '/login',
            views: {
                'main@': {
                    template: require('./login/login.html'),
                    controller: loginController, controllerAs: 'vm'
                }
            }
        })

        .state('app.auth.forgot', {
            url: '/forgot',
            views: {
                'main@': {
                    template: require('./forgot/forgotpassword.html'),
                    controller: forgotController, controllerAs: 'vm'
                }
            }
        })

        .state('app.auth.reset', {
            url: '/reset/:token',
            views: {
                'main@': {
                    template: require('./reset/reset.html'),
                    controller: resetController, controllerAs: 'vm'
                }
            },
            page: {
                title: 'Reset your password',
                note: 'Please enter a new password for your account.',
                successMessage: 'Password has been changed successfully.'
            }
        })

        .state('app.auth.setup', {
            url: '/setup/:token',
            views: {
                'main@': {
                    template: require('./reset/reset.html'),
                    controller: resetController, controllerAs: 'vm'
                }
            },
            page: {
                title: 'Set up your password',
                note: 'Please enter a password to activate your account.',
                successMessage: 'Password has been set successfully.'
            }
        })
}

export default angular.module('app.auth', [])
    .provider('authInterceptor', authInterceptor)
    .factory('authService', authService)
    .service('principal', principal)
    .config(config).name
