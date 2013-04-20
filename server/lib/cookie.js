/*
 * server/lib/cookie.js
 */

'use strict';

function clearUserCookie(req, res) {
  res.clearCookie('user.name.full');
}

function setUserCookie(req, res) {
  res.cookie('user.name.full', (req.user ? req.user.name.full : null));
}

// Public API
exports.clearUserCookie = clearUserCookie;
exports.setUserCookie = setUserCookie;
