/*
 * client/js/shared/directives/focus.js
 */

'use strict';

var _injected = {};

function link(scope, elem, attrs) {
  scope.$watch(attrs.focus, function () {
    var getter = _injected.$parse(attrs.focus);
    var setter = getter.assign;
    if (getter(scope)) {
      elem[0].focus();
      setter(scope, false);
    }
  });
}

exports = module.exports = function (ngModule) {
  ngModule.directive('focus', function ($parse) {
    _injected = {
      $parse: $parse
    };

    return {
      link: link
    };
  });
};
