/*
 * client/js/lib/kissmetrics/index.js
 */

'use strict';

function Kissmetrics() {

}

Kissmetrics.prototype.init = function (id) {
  global._kmq = global._kmq || [];
  global._kmk = global._kmk || id;

  function _kms(u){
    setTimeout(function(){
      var d = document,
          f = d.getElementsByTagName('script')[0],
          s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = u;
      f.parentNode.insertBefore(s, f);
    }, 1);
  }

  _kms('//i.kissmetrics.com/i.js');
  _kms('//doug1izaerwt3.cloudfront.net/' + global._kmk + '.1.js');
};

// Public API
exports = module.exports = Kissmetrics;
