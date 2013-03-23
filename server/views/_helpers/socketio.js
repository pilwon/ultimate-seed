/*
 * server/views/_helpers/socketio.js
 */

'use strict';

exports = module.exports = function () {
  return [
    '<script src="/socket.io/socket.io.js"></script>',
    '<script>',
    '  var socket = io.connect();',
    '  socket.on(\'hello\', function (data) {',
    '    console.log(data);',
    '    socket.emit(\'test\', { hello: \'world\' });',
    '  });',
    '</script>'
  ].join('');
};
