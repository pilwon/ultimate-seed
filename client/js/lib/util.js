/*
 * client/js/lib/util.js
 */

/* global define */

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  function collectionToGrid(collection, numColumns) {
    var grid = [],
        items, row, i;

    if (collection instanceof Backbone.Collection) {
      items = collection.toJSON();
    } else {
      items = [];
    }

    if (!_.isNumber(numColumns)) {
      numColumns = 1;
    }

    while (items.length) {
      row = [];
      for (i = 0; i < numColumns; ++i) {
        row.push(items.shift());
      }
      grid.push(row);
    }

    return grid;
  }

  function formatNumber(num) {
    var result = num.toString().split('.');
    result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    result = result.join('.');
    return result;
  }

  return {
    collectionToGrid: collectionToGrid,
    formatNumber: formatNumber
  };

});
