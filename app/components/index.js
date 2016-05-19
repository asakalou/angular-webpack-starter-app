/**
 * Created by asakalou on 5/5/16.
 */

import angular from 'angular';

import userMenu from './user-menu';
import widgetPanel from './widget-panel';

export default angular.module('app.components', [
    userMenu,
    widgetPanel
]).name;