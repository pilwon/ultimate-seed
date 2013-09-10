/*
 * client/js/shared/directives/focus.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.directive('focus', function () {
    return {
      link: function (scope, elem, attr) {
        scope.$watch(attr.focus, function() {
          if (scope.$eval(attr.focus)) {
            elem[0].focus();
          }
        });
      }
    };
  });
};
