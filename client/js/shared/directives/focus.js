/*
 * client/js/shared/directives/focus.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule.directive('focus', function ($parse) {
    return {
      link: function (scope, elem, attrs) {
        scope.$watch(attrs.focus, function() {
          var getter = $parse(attrs.focus);
          var setter = getter.assign;
          if (getter(scope)) {
            elem[0].focus();
            setter(scope, false);
          }
        });
      }
    };
  });
};
