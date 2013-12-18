/*
 * client/js/shared/services/util.js
 */

'use strict';

/**
 * Given a state, e.g. "app.account.summary", returns an array of ancestor states
 * ["app", "app.account", "app.account.summary"] (last element removed if
 * `includeCurrentState` is false)
 */
function getAncestorStates(state, includeCurrentState) {
  var states = [state],
      temp;
  while (true) {
    if (states[0].indexOf('.') === -1) { break; }
    temp = states[0].split('.');
    states.unshift(temp.slice(0, temp.length - 1).join('.'));
  }
  if (!includeCurrentState) {
    states.pop();
  }
  return states;
}

// Public API
exports = module.exports = function (ngModule) {
  ngModule.factory('util', function () {
    return {
      getAncestorStates: getAncestorStates
    };
  });
};
