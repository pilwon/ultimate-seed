/*
 * server/controllers/home.js
 */

'use strict';

var app = require('../app');

function index(req, res) {
  res.render('home/index');
}

function express(req, res) {
  res.render('home/express', {
    hello: 'Hello from express world!'
  });
}

function page(req, res) {
  res.render('home/page', {
    layout: 'static',
    documentTitle: 'Static Page',
    navTitle: 'Static Layout'
  });
}

function task(req, res, next) {
  app.bbq.create('Test.Add', {
    a: 1,
    b: 2
  }).save(function (err) {
    if (err) { return next(err); }
    res.send('Scheduled task. (`node worker` to process)');
  });
}

// Public API
exports.index = index;
exports.express = express;
exports.page = page;
exports.task = task;
