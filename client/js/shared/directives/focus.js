/*
 * client/js/shared/directives/focus.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.directive('focus', function ($timeout) {
    return {
      scope: {
        trigger: '=focus'
      },
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === true) {
            element[0].focus();
            scope.trigger = false;
          }
        });
      }
    };
  });
};
