/*
 * console/module.js
 */

'use strict';

var fs = require('fs'),
    S = require('string'),
    q = require('q'),
    prompt = require('prompt');

require('colors');

// Create new Angular module
var createModule = {};

prompt.start();

createModule.command = function() {
  var properties = [
    {
      name: 'module_name',
      description: 'Enter an module name',
      default: 'admin',
      validator: /^[a-zA-Z]+$/,
      warning: 'Page name must be only letters'.red
    }
  ];
  prompt.get(properties, function (err, result) {
    if (err) { return console.log(err); }
    console.log('Command-line input received:');
    console.log('  module_name'.cyan + ': ' + result.module_name);
    createModule.run(result.module_name.toLowerCase(), function() {});
  });
};

createModule.run = function(moduleName, cb) {

  var findStr = '';

  fs.exists('./client/js/' + moduleName, function(exists) {
    if (!exists) {
      mkDir('./client/js/' + moduleName).then(function() {
        return mkDir('./client/js/' + moduleName + '/controllers');
      }).then(function() {
        return mkDir('./client/js/' + moduleName + '/templates');
      }).then(function() {
        return mkFile('index.js.proto', 'index.js', moduleName);
      }).then(function() {
        return mkFile('_layout.js.proto', 'controllers/_layout.js', moduleName);
      }).then(function() {
        return mkFile('main.js.proto', 'controllers/main.js', moduleName);
      }).then(function() {
        return mkFile('_layout.html.proto', 'templates/_layout.html', moduleName);
      }).then(function() {
        return mkFile('main.html.proto', 'templates/main.html', moduleName);
      }).then(function() {
        var deferredReadIndex = q.defer();
        fs.readFile('./client/js/index.js', 'utf8', function (err, data) {
          if (err) {
            deferredReadIndex.reject(err);
          } else {
            findStr = '// Register modules.\nrequire(\'./'+ moduleName +'\');';
            var expr = new RegExp('\/\/ Register modules.', 'g');
            data = data.replace(expr, findStr);
            deferredReadIndex.resolve(data);
          }
        });
        return deferredReadIndex.promise;
      }).then(function(data) {
        var deferredWriteIndex = q.defer();
        fs.writeFile('./client/js/index.js', data, function (err) {
          if (err) {
            deferredWriteIndex.reject(err);
          } else {
            deferredWriteIndex.resolve();
          }
        });
        return deferredWriteIndex.promise;
      }).then(function() {
        var deferredReadApp = q.defer();
        fs.readFile('./client/js/app.js', 'utf8', function (err, data) {
          if (err) {
            deferredReadApp.reject(err);
          } else {
            findStr = '\'app.main\',\n  \'app.' + moduleName + '\'';
            var expr = new RegExp('\'app.main\'', 'g');
            data = data.replace(expr, findStr);
            deferredReadApp.resolve(data);
          }
        });
        return deferredReadApp.promise;
      }).then(function(data) {
        var deferredWriteApp = q.defer();
        fs.writeFile('./client/js/app.js', data, function (err) {
          if (err) {
            deferredWriteApp.reject(err);
          } else {
            deferredWriteApp.resolve();
          }
        });
        return deferredWriteApp.promise;
      }).then(function() {
        var deferredReadLayout = q.defer();
        fs.readFile('./client/js/layout/templates/_nav.html', 'utf8', function (err, data) {
          if (err) {
            deferredReadLayout.reject(err);
          } else {
            findStr = '' +
              '<ul class="nav navbar-nav">\n' +
              '        <li ng-class="{ active: $state.includes(\'app.' + moduleName + '\') }">\n' +
              '          <a ng-href="/' + moduleName + '">' + moduleName + '</a>\n' +
              '        </li>';
            var expr = new RegExp('<ul class="nav navbar-nav">', 'g');
            data = data.replace(expr, findStr);
            deferredReadLayout.resolve(data);
          }
        });
        return deferredReadLayout.promise;
      }).then(function(data) {
        var deferredWriteLayout = q.defer();
        fs.writeFile('./client/js/layout/templates/_nav.html', data, function (err) {
          if (err) {
            deferredWriteLayout.reject(err);
          } else {
            deferredWriteLayout.resolve();
          }
        });
        return deferredWriteLayout.promise;
      }).then(function() {
        console.log('End create module.'.yellow);
        cb();
      }).fail(function(err) {
        console.log(err);
      });
    } else {
      console.log('Module already exists.'.yellow);
      cb();
    }
  });
};

function existsFile(file) {
  var deferredExistsFile = q.defer();
  fs.exists(file, function(exists) {
    deferredExistsFile.resolve(exists);
  });
  return deferredExistsFile.promise;
}

function mkDir(path) {
  var deferredMkDir = q.defer();
  existsFile(path).then(function(exists) {
    if (!exists) {
      fs.mkdir(path, function(err) {
        if (err) {
          deferredMkDir.reject(err);
        } else {
          console.log('Create module folder "'.yellow + path.cyan + '".'.yellow);
          deferredMkDir.resolve();
        }
      });
    } else {
      deferredMkDir.resolve();
    }
  });
  return deferredMkDir.promise;
}

function mkFile(pathSource, pathDest, moduleName) {
  pathDest = './client/js/' + moduleName + '/' + pathDest;
  var deferredMkFile = q.defer();
  fs.readFile('./console/storage/module/' + pathSource, 'utf8', function (err, data) {
    if (err) {
      deferredMkFile.reject(err);
    } else {
      data = S(data).replaceAll('/*module_name_l*/', moduleName).s;
      data = S(data).replaceAll('/*module_name_f_u*/', S(moduleName).humanize().s).s;
      fs.writeFile(pathDest, data, function (err) {
        if (err) {
          deferredMkFile.reject(err);
        } else {
          console.log('Create module file "'.yellow + pathDest.cyan + '".'.yellow);
          deferredMkFile.resolve();
        }
      });
    }
  });
  return deferredMkFile.promise;
}

// Assign module to exports
exports = module.exports = createModule;
