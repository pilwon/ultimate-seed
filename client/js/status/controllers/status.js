/*
 * client/js/status/controllers/status.js
 */

'use strict';

var _ = require('lodash');

var DEFAULT_FETCH_INTEVAL = 5000;

var _fetchIntervalId,
    _o;

function _fetch() {
  var $http = _o.$http,
      $scope = _o.$scope,
      $timeout = _o.$timeout;

  $timeout.cancel(_fetchIntervalId);

  $http.get('/status/health').then(function (res) {
    $scope.status.unshift(res.data);
  });

  _fetchIntervalId = $timeout(_fetch, $scope.fetchInterval);
}

function _onCreate() {
  _fetch();
}

function _onDestroy() {
  _o.$timeout.cancel(_fetchIntervalId);
}

function setFetchInterval(fetchInterval) {
  _o.$scope.fetchInterval = fetchInterval;
  _fetch();
}

exports = module.exports = function (ngModule) {
  ngModule.controller('StatusCtrl', function ($http, $scope, $timeout) {
    _o = {
      $http: $http,
      $scope: $scope,
      $timeout: $timeout
    };

    _.assign($scope, {
      fetchInterval: DEFAULT_FETCH_INTEVAL,
      setFetchInterval: setFetchInterval,
      status: []
    });

    $scope.$on('$destroy', _onDestroy);
    _onCreate();
  });
};
