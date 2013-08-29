/*
 * client/js/configs/restangular.js
 */

/* globals app */
'use strict';



app.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
}]);
