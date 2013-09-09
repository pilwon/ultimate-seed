/*
 * client/js/services/alert.js
 */

'use strict';

var angular = require('angular');



var alertService = angular.module('ngApp.services.alert', [
]);

alertService.factory('alertService', function () {
  var service = {};
  var _messages = [];

  function addMessage(type, message) {
    _messages.push({
      'type': type,
      'message': message
    });
  }

  service.addError = function (message) {
    addMessage('error', message);
  };

  service.addInfo = function (message) {
    addMessage('info', message);
  };

  service.addSuccess = function (message) {
    addMessage('success', message);
  };

  service.removeMessage = function (index) {
    _messages.splice(index, 1);
  };

  service.getMessages = function () {
    return _messages;
  };

  return service;
});
