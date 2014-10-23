/*
 * client/js/main/controllers/home.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (ngModule) {
  ngModule.controller('HomeCtrl', function ($scope, features, appSocket) {
    $scope.items = features;

    appSocket.emit('info', {
      // modernizr: Modernizr,
      navigator: _.transform(navigator, function (result, val, key) {
        if (_.isString(val)) {
          result[key] = val;
        }
      })
    });

    appSocket.on('test', function (data) {
      console.log(data);
      appSocket.emit('test', { hello: 'from browser world' });
    });

  });
};
