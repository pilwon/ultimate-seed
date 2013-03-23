/*
 * server/controllers/account.js
 */

'use strict';

function index(req, res) {
  res.render('account/index');
}

// Public API
exports.index = index;
