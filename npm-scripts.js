/*
 * npm-scripts.js
 */

'use strict';

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    util = require('util');

require('colors');

var _ = require('lodash');

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

function prepublish() {
  console.log('npm prepublish script executed'.grey);
}

function postpublish() {
  console.log('npm postpublish script executed'.grey);
}

function preinstall() {
  console.log('npm preinstall script executed'.grey);
}

function postinstall() {
  // Generate config files from samples if they don't already exist.
  [{
    from: path.join(project.path.config, 'development.sample.json'),
    to: path.join(project.path.config, 'development.json')
  }, {
    from: path.join(project.path.config, 'production.sample.json'),
    to: path.join(project.path.config, 'production.json')
  }].forEach(function (fileCopy) {
    if (!fs.existsSync(fileCopy.to)) {
      exec(util.format('cp -n %s %s', fileCopy.from, fileCopy.to), function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    }
  });

  console.log('npm postinstall script executed'.grey);
}

function preuninstall() {
  console.log('npm preuninstall script executed'.grey);
}

function postuninstall() {
  console.log('npm postuninstall script executed'.grey);
}

function preupdate() {
  console.log('npm preupdate script executed'.grey);
}

function postupdate() {
  console.log('npm postupdate script executed'.grey);
}

function usage() {
  console.error();
  console.error('  Usage:');
  console.error();
  _.keys(commands).forEach(function (command) {
    console.error(util.format('    node %s %s',
                  path.basename(__filename, '.js'),
                  command).grey);
  });
  console.error();
  process.exit(1);
}

function main() {
  if (process.argv.length !== 3 || !_.has(commands, process.argv[2])) {
    usage();
  }
  commands[process.argv[2]]();
}

main();
