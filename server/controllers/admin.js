/*
 * server/controllers/admin.js
 */

'use strict';

function index(req, res) {
  res.render('admin/index');
}

// Public API
exports.index = index;
