/*
 * test/client/test.js
 */

define([
  'intern!bdd',
  'intern/chai!expect'
], function (bdd, expect) {
  with (bdd) {
    describe('client', function () {
      it('should pass', function () {
        expect(true).to.equal(true);
      });
    });
  }
});
