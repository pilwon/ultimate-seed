/*
 * client/js/status/controllers/status.js
 */

'use strict';

var _ = require('lodash');

var DEFAULT_FETCH_INTEVAL = 5000;

var _fetchIntervalId,
    _injected;

function _fetch() {
  var $http = _injected.$http,
      $scope = _injected.$scope,
      $timeout = _injected.$timeout;

  $timeout.cancel(_fetchIntervalId);

  $http.get('/status/health').then(function (res) {
    $scope.status.unshift(res.data);
  });

  _fetchIntervalId = $timeout(_fetch, $scope.fetchInterval);
}

function _init() {
  var $scope = _injected.$scope,
      $timeout = _injected.$timeout;

  _.assign($scope, {
    fetchInterval: DEFAULT_FETCH_INTEVAL,
    setFetchInterval: setFetchInterval,
    status: []
  });

  $scope.$on('$destroy', function () {
    $timeout.cancel(_fetchIntervalId);
  });

  _fetch();
}

function setFetchInterval(fetchInterval) {
  _injected.$scope.fetchInterval = fetchInterval;

  _fetch();
}

exports = module.exports = function (ngModule) {
  ngModule.controller('StatusCtrl', function ($http, $scope, $timeout) {
    _injected = {
      $http: $http,
      $scope: $scope,
      $timeout: $timeout
    };
    _init();
  });
};
