/*
 * console/controller.js
 */

'use strict';

var fs = require('fs'),
    S = require('string'),
    q = require('q'),
    prompt = require('prompt');

require('colors');

// Create new Controller
var createController = {};

prompt.start();

createController.command = function() {
  var properties = [
    {
      name: 'controller_name',
      messages: 'controller name',
      description: 'Enter an controller name',
    default: 'testcontroller',
      validator: /^[a-zA-Z]+$/,
      warning: 'Controller name must be only letters'.red
    }
  ];
  prompt.get(properties, function (err, result) {
    if (err) { return console.log(err); }
    console.log('Command-line input received:');
    console.log('  controller_name'.cyan + ': ' + result.controller_name);
    createResource.run(result.model_name.toLowerCase(), function() {});
  });
};

createController.run = function(modelName, cb) {
  var findStr = '';
  existsFile('./server/controllers/api/' + modelName + '.js', cb).then(function() {
    var deferredReadController = q.defer();
    fs.readFile('./console/storage/controller/controller.js.proto', 'utf8', function (err, data) {
      if (err) {
        deferredReadController.reject(err);
      } else {
        data = S(data).replaceAll('/*model_name_l*/', modelName).s;
        data = S(data).replaceAll('/*model_name_f_u*/', S(modelName).humanize().s).s;
        deferredReadController.resolve(data);
      }
    });
    return deferredReadController.promise;
  }).then(function(data) {
    var deferredWriteController = q.defer();
    fs.writeFile('./server/controllers/api/' + modelName + '.js', data, function (err) {
      if (err) {
        deferredWriteController.reject(err);
      } else {
        console.log('Create controller file "'.yellow + './server/controllers/api/'.cyan + modelName.cyan + '.js'.cyan + '".'.yellow);
        deferredWriteController.resolve();
      }
    });
    return deferredWriteController.promise;
  }).then(function() {
    var deferredReadRoutes = q.defer();
    fs.readFile('./server/routes.js', 'utf8', function (err, data) {
      if (err) {
        deferredReadRoutes.reject(err);
      } else {
        findStr = '' +
          '// API' +
          '';
        var expr = new RegExp(findStr, 'g');
        findStr += '' +
          '\n' +
          '  restify.any (\'/api/' + modelName + '/any\', c.api.' + modelName + ');' +
          '';
        data = data.replace(expr, findStr);
        deferredReadRoutes.resolve(data);
      }
    });
    return deferredReadRoutes.promise;
  }).then(function(data) {
    var deferredWriteRoutes = q.defer();
    fs.writeFile('./server/routes.js', data, function (err) {
      if (err) {
        deferredWriteRoutes.reject(err);
      } else {
        deferredWriteRoutes.resolve();
      }
    });
    return deferredWriteRoutes.promise;
  }).then(function() {
    console.log('End create controller.'.yellow);
    cb();
  }).fail(function(err) {
    console.log(err);
  });
};

function existsFile(file, cb) {
  var deferredExistsFile = q.defer();
  fs.exists(file, function(exists) {
    if (exists) {
      deferredExistsFile.reject('Controller already exist.'.yellow);
      cb();
    } else {
      deferredExistsFile.resolve(exists);
    }
  });
  return deferredExistsFile.promise;
}

// Assign model to exports
exports = module.exports = createController;
