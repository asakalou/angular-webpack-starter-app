/**
 * Created by asakalou on 5/5/16.
 */

import './style.less';

panel.$inject = [];
function panel() {
    "use strict";

    return {
        restrict: 'E',
        template: require('./widget-panel.html'),
        controller: ['$scope', '$element', function($scope, $element) {
            var self = this;
            this.element = angular.element($element.children()[0]);

            $scope.$on('$destroy', function() {
                self.element = null;
            });
        }],
        scope: {},
        link: function(scope, el, attrs) {

        }
    }
}

controls.$inject = [];
function controls() {
    "use strict";

    return {
        restrict: 'E',
        template: require('./controls.html'),
        require: '^appWidgetPanel',
        scope: {},
        link: function(scope, el, attrs, ctrl) {
            scope.expanded = false;

            scope.toggleExpand = function() {
                ctrl.element.toggleClass('widget-panel-expanded');
                scope.expanded = !scope.expanded;
            };
        }
    }
}

export default angular.module('app.components.widgetpanel', [])
    .directive('appWidgetPanel', panel)
    .directive('appWidgetPanelControls', controls)
    .name

