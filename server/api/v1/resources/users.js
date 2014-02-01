/*
 * server/api/v1/resources/users.js
 */

'use strict';

module.exports = {
  // GET <resource>
  index: function *(next) {
    this.body = yield this.db.table('users').getAll();
  },

  // GET <resource>/:id
  show: function *(next) {
    this.body = yield this.db.table('users').get(this.params.user);
  },

  // POST <resource>
  create: function *(next) {
    this.body = yield this.db.table('users').insert(this.parse(this));
  },

  // PUT <resource>/:id
  update: function *(next) {
    this.body = yield this.db.table('users').update(this.params.user, this.parse(this));
  },

  // DELETE <resource>/:id
  destroy: function *(next) {
    this.body = yield this.db.table('users').delete(this.params.user);
  }
};
