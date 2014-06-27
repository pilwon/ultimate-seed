/*
 * console/resource.js
 */

'use strict';

var fs = require('fs'),
    S = require('string'),
    q = require('q'),
    prompt = require('prompt');

require('colors');

// Create new Resource
var createResource = {};

prompt.start();

createResource.command = function() {
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

createResource.run = function(modelName, cb) {

  fs.exists('./client/js/shared/services/resource/' + modelName + '.js', function(exists) {
    if (!exists) {
      var dataResource = '';
      readFile('./console/storage/resource/resource.js.proto').then(function(data) {
        data = S(data).replaceAll('/*model_name_l*/', modelName).s;
        data = S(data).replaceAll('/*model_name_f_u*/', S(modelName).humanize().s).s;
        dataResource = data;
      }).then(function(){
        var deferredExists = q.defer();
        fs.exists('./client/js/shared/services/resource', function(exists) {
          deferredExists.resolve(exists);
        });
        return deferredExists.promise;
      }).then(function(exists){
        if (!exists) {
          var deferredMkDir = q.defer();
          fs.mkdir('./client/js/shared/services/resource', function(err) {
            if (err) {
              deferredMkDir.reject(err);
            } else {
              deferredMkDir.resolve();
            }
          });
          return deferredMkDir.promise;
        }
      }).then(function(){
        var deferredWriteFile = q.defer();
        fs.writeFile('./client/js/shared/services/resource/' + modelName + '.js', dataResource, function(err) {
          if (err) {
            deferredWriteFile.reject(err);
          } else {
            deferredWriteFile.resolve();
          }
        });
        return deferredWriteFile.promise;
      }).then(function() {
        var deferredReadIndexFile = q.defer();
        fs.readFile('./client/js/shared/index.js', 'utf8', function (err, data) {
          if (err) {
            deferredReadIndexFile.reject(err);
          } else {
            deferredReadIndexFile.resolve(data);
          }
        });
        return deferredReadIndexFile.promise;
      }).then(function(data) {
        var deferredWriteIndexFile = q.defer();
        var findStr = '' +
          '// Resource' +
          '';
        var expr = new RegExp(findStr, 'g');
        findStr += '' +
          '\n' +
          'require(\'./services/resource/' + modelName + '\')(ngModule);' +
          '';
        data = data.replace(expr, findStr);
        fs.writeFile('./client/js/shared/index.js', data, function (err) {
          if (err) {
            deferredWriteIndexFile.reject(err);
          } else {
            deferredWriteIndexFile.resolve(data);
          }
        });
        return deferredWriteIndexFile.promise;
      }).then(function() {
        console.log('End create resource.'.yellow);
        cb();
      }).fail(function(err){
        console.log(err);
      });
    } else {
      console.log('Resource already exist.'.yellow);
      cb();
    }
  });
};

function readFile(file) {
  var deferredReadFile = q.defer();
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      deferredReadFile.reject(err);
    } else {
      deferredReadFile.resolve(data);
    }
  });
  return deferredReadFile.promise;
}

// Assign model to exports
exports = module.exports = createResource;
