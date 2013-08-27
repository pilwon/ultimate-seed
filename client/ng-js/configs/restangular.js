/*
 * client/js/configs/restangular.js
 */

/* globals app */
'use strict';



app.config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
});
