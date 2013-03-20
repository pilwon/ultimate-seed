/*
 * test/client/controllers/home.js
 */

'use strict';

/* globals beforeEach, describe, expect, inject, it */
describe('HomeCtrl', function () {
  var scope;

  beforeEach(inject(function ($controller) {
    $controller('HomeCtrl', { $scope: scope = {} });
  }));

  it('should create "items" model with 18 items', function () {
    expect(scope.items.length).toBe(18);
  });
});
