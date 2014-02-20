/*
 * npm-scripts.js
 */

'use strict';

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    util = require('util');

var project = require('./project');

var commands = {
  prepublish: prepublish,
  postpublish: postpublish,
  preinstall: preinstall,
  postinstall: postinstall,
  preuninstall: preuninstall,
  postuninstall: postuninstall,
  preupdate: preupdate,
  postupdate: postupdate
};

var grey = function (text) {
  return '\x1B[90m' + text + '\x1B[39m';
};

function prepublish() {
  console.log(grey('npm prepublish script executed'));
}

function postpublish() {
  console.log(grey('npm postpublish script executed'));
}

function preinstall() {
  console.log(grey('npm preinstall script executed'));
}

function postinstall() {
  // Generate config files from samples if they don't already exist.
  ['development', 'production', 'staging'].forEach(function (env) {
    var from = path.join(project.path.config, env + '.sample.json'),
        to = path.join(project.path.config, env + '.json');
    if (!fs.existsSync(to)) {
      exec(util.format('cp -n %s %s', from, to), function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    }
  });

  console.log(grey('npm postinstall script executed'));
}

function preuninstall() {
  console.log(grey('npm preuninstall script executed'));
}

function postuninstall() {
  console.log(grey('npm postuninstall script executed'));
}

function preupdate() {
  console.log(grey('npm preupdate script executed'));
}

function postupdate() {
  console.log(grey('npm postupdate script executed'));
}

function usage() {
  console.error();
  console.error('  Usage:');
  console.error();
  Object.keys(commands).forEach(function (command) {
    console.error(grey(util.format('    node %s %s',
                  path.basename(__filename, '.js'),
                  command)));
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
