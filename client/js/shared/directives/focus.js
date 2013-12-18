/*
 * client/js/shared/directives/focus.js
 */

'use strict';

var _o;

function link(scope, elem, attrs) {
  scope.$watch(attrs.focus, function () {
    var getter = _o.$parse(attrs.focus);
    var setter = getter.assign;
    if (getter(scope)) {
      elem[0].focus();
      setter(scope, false);
    }
  });
}

exports = module.exports = function (ngModule) {
  ngModule.directive('focus', function ($parse) {
    _o = {
      $parse: $parse
    };

    return {
      link: link
    };
  });
};
