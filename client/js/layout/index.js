/*
 * client/js/layout/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.layout', []);

// Controllers
require('./controllers/_alert')(ngModule);
require('./controllers/_footer')(ngModule);
require('./controllers/_header')(ngModule);
require('./controllers/_nav')(ngModule);

// Services
require('./services/layout')(ngModule);

var _views = {
  alert: {
    controller: '_AlertCtrl',
    template: rhtml('./templates/_alert.html')
  },
  footer: {
    controller: '_FooterCtrl',
    template: rhtml('./templates/_footer.html')
  },
  header: {
    controller: '_HeaderCtrl',
    template: rhtml('./templates/_header.html')
  },
  nav: {
    controller: '_NavCtrl',
    template: rhtml('./templates/_nav.html')
  }
};

// Routes
ngModule.config(function ($stateProvider, layoutProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: _views
    });

  layoutProvider.setViews(_views);
});
