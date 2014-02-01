/*
 * server/controllers/home.js
 */

// 'use strict';

function *index() {
  yield this.render('home/index');
}

function *koa() {
  yield this.render('home/koa', {
    hello: 'Hello from koa world!'
  });
}

function *page() {
  yield this.render('home/page', {
    layout: 'static',
    documentTitle: 'Static Page',
    navTitle: 'Static Layout'
  });
}

function *task(next) {
  // this.bbq.create('Test.Add', {
  //   a: 1,
  //   b: 2
  // }).save(function (err) {
  //   if (err) { return yield next(err); }
  //   res.send('Scheduled task. (`node worker` to process)');
  // });
}

function *test() {
  this.body = 'Test ' + (this.params.id ? decodeURIComponent(this.params.id) : '');
}

// Public API
exports.index = index;
exports.koa = koa;
exports.page = page;
exports.task = task;
exports.test = test;
