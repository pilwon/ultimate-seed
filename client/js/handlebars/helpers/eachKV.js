/*
 * client/js/handlebars/helpers/eachKV.js
 */

'use strict';

var _ = require('lodash');

/**
 * Handlebars helper iterating each key-value pair of an object.
 *
 * Usage:
 *
 * <table>
 *   {{#eachKV object}}
 *     <tr>
 *       <th>{{k}}</td>
 *       <td>{{v}}</td>
 *     </tr>
 *   {{/eachKV}}
 * </table>
 */
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
