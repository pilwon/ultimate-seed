'use strict';

var angular = require('angular');

require('./account');
require('./admin');
require('./auth');
require('./footer');
require('./header');
require('./home');
require('./nav');



angular.module('ngApp.modules', [
  'ngApp.modules.account',
  'ngApp.modules.admin',
  'ngApp.modules.auth',
  'ngApp.modules.footer',
  'ngApp.modules.header',
  'ngApp.modules.home',
  'ngApp.modules.nav'
]);
