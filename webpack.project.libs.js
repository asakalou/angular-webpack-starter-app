/**
 * Created by asakalou on 2/15/16.
 */

module.exports = {
    vendor: [
        'lodash',
        'jquery',
        'angular',
        'angular-ui-router',
        'angular-block-ui',
        './app/styles/bootstrap.less',
        'bootstrap/dist/js/bootstrap.js',
        'angular-block-ui/dist/angular-block-ui.css',
        'angular-growl-v2/build/angular-growl.js',
        'angular-growl-v2/build/angular-growl.css',
        'font-awesome/css/font-awesome.css'
    ],
    provide: {
        '_': 'lodash',
        '$': 'jquery',
        'jQuery': 'jquery',
        'uirouter': 'angular-ui-router'
    }
};