/*
 * client/js/shared/services/alert.js
 */

'use strict';

var _ = require('lodash');

var _messages = [];

function getMessages() {
  return _messages;
}

function addMessage(type, message) {
  _messages.push({
    type: type,
    message: message
  });
}

function setMessages(type, messages) {
  clearMessages();
  _([messages])
      .flatten()
      .each(function (message) {
        _messages.push({
          type: type,
          message: message
        });
      });
}

function clearMessages() {
  _messages.length = 0;
}

function removeMessage(idx) {
  _messages.splice(idx, 1);
}

exports = module.exports = function (ngModule) {
  ngModule.factory('alert', function () {
    return {
      getMessages: getMessages,
      setMessages: setMessages,
      addMessage: addMessage,
      clearMessages: clearMessages,
      removeMessage: removeMessage
    };
  });
};
