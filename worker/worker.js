/*
 * worker/worker.js
 */

require('colors');

'use strict';

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    util = require('util');

var commands = {
  'test': test
};

function test() {
  require('./tasks/test')();
}

function usage() {
  console.error();
  console.error('  Usage:');
  console.error();
  Object.keys(commands).forEach(function (command) {
    console.error(util.format('    node %s %s',
                  path.basename(__filename, '.js'),
                  command).grey);
  });
  console.error();
  process.exit(1);
}

function main() {
  if (process.argv.length !== 3 || !commands.hasOwnProperty(process.argv[2])) {
    usage();
  }
  commands[process.argv[2]]();
}

main();
