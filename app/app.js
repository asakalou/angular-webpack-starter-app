/**
 * Created by asakalou on 2/14/16.
 */

import './styles/bootstrap.less';
import 'font-awesome/css/font-awesome.css';
import 'angular-block-ui/dist/angular-block-ui.css';
import 'angular-growl-v2/build/angular-growl.css';
import './styles/style.less';

import 'lodash';
import 'jquery';

import 'bootstrap/dist/js/bootstrap.js';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import blockUI from 'angular-block-ui';

import 'angular-growl-v2/build/angular-growl';



import {config, run} from './app.config';

import components from './components';
import auth from './auth';
import home from './home';
import dashboard from './dashboard';


angular.module('app', [
        uirouter,
        blockUI,
        'angular-growl',

        components,
        auth,
        home,
        dashboard
    ])
    .config(config)
    .run(run);