/*
 * console/crud.js
 */

'use strict';

var fs = require('fs'),
    S = require('string'),
    q = require('q'),
    prompt = require('prompt');

require('colors');

var createModule = require('./module'),
    createPage = require('./page'),
    createModel = require('./model'),
    createController = require('./controller'),
    createResource = require('./resource');

// Create CRUD
var createCRUD = {};

prompt.start();

createCRUD.command = function() {
  var properties = [
    {
      name: 'module_name',
      messages: 'module name',
      description: 'Enter an module name',
      default: 'admin',
      validator: /^[a-zA-Z]+$/,
      warning: 'Module name must be only letters'.red
    },
    {
      name: 'page_name',
      messages: 'page name',
      description: 'Enter an page name',
      default: 'testpage',
      validator: /^[a-zA-Z]+$/,
      warning: 'Page name must be only letters'.red
    },
    {
      name: 'model_name',
      messages: 'model name',
      description: 'Enter an model name',
      default: 'testmodel',
      validator: /^[a-zA-Z]+$/,
      warning: 'Model name must be only letters'.red
    }
  ];
  prompt.get(properties, function (err, result) {
    if (err) { return console.log(err); }
    console.log('Command-line input received:');
    console.log('  module_name'.cyan + ': ' + result.module_name);
    console.log('  page_name'.cyan + ': ' + result.page_name);
    console.log('  model_name'.cyan + ': ' + result.model_name);
    createCRUD.run(
      result.module_name.toLowerCase(),
      result.page_name.toLowerCase(),
      result.model_name.toLowerCase()
    );
  });
};

createCRUD.run = function(moduleName, pageName, modelName) {
  createModule.run(moduleName, function() {
    createPage.run(moduleName, pageName, modelName, function() {
      createModel.run(modelName, function() {
        createController.run(modelName, function() {
          createResource.run(modelName, function() {
            console.log('End create CRUD.'.cyan);
          });
        });
      });
    });
  });
};

// Assign model to exports
exports = module.exports = createCRUD;
