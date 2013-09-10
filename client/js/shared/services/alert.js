/*
 * client/js/shared/services/alert.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.factory('alert', function () {
    var service = {},
        _messages = [];

    function addMessage(type, msg) {
      _messages.push({
        'type': type,
        'message': msg
      });
    }

    service.addError = function (msg) {
      addMessage('error', msg);
    };

    service.addInfo = function (msg) {
      addMessage('info', msg);
    };

    service.addSuccess = function (msg) {
      addMessage('success', msg);
    };

    service.removeMessage = function (idx) {
      _messages.splice(idx, 1);
    };

    service.getMessages = function () {
      return _messages;
    };

    return service;
  });
};
