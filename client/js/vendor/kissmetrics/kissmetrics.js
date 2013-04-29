/*
 * client/js/vendor/kissmetrics/kissmetrics.js
 */

/* global define */

define(function () {
  'use strict';

  function _init() {
    window._kmq = window._kmq || [];
    window._kmk = window._kmk || '@@@@@';
    function _kms(u){
      setTimeout(function(){
        var d = document, f = d.getElementsByTagName('script')[0],
        s = d.createElement('script');
        s.type = 'text/javascript'; s.async = true; s.src = u;
        f.parentNode.insertBefore(s, f);
      }, 1);
    }
    _kms('//i.kissmetrics.com/i.js');
    _kms('//doug1izaerwt3.cloudfront.net/' + _kmk + '.1.js');
  }

  _init();
});
