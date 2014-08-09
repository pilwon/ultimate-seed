/*
 * client/js/shared/services/resource/resourceuser.js
 */

'use strict';

// Public API
exports = module.exports = function (ngModule) {
  ngModule.service('user', function ($resource) {
    return $resource('/api/user/:role/:_id', {
      '_id': '@_id',
      'role': '@role'
    },
    {
      modify: {
        method: 'PUT'
      },
      get: {
        method: 'GET'
        //        cache : true
      }
    });
  });
};