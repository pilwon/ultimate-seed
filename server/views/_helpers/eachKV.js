/*
 * server/views/_helpers/eachKV.js
 */

'use strict';

var _ = require('lodash');

exports = module.exports = function (context, options) {
  var sortedKeys = _.sortBy(_.keys(context), function (s) { return s; }),
      result = '';

  _.each(sortedKeys, function (property) {
    result += options.fn({
      k: property,
      v: context[property]
    });
  });

  return result;
};
