/*
 * console/model.js
 */

'use strict';

var fs = require('fs'),
    S = require('string'),
    q = require('q'),
    prompt = require('prompt');

require('colors');

// Create new Mongo Model
var createModel = {};

prompt.start();

createModel.command = function() {
  var properties = [
    {
      name: 'model_name',
      description: 'Enter an model name',
      default: 'feature',
      validator: /^[a-zA-Z]+$/,
      warning: 'Model name must be only letters'.red
    }
  ];
  prompt.get(properties, function (err, result) {
    if (err) { return console.log(err); }
    console.log('Command-line input received:');
    console.log('  model_name'.cyan + ': ' + result.model_name);
    createModel.run(result.model_name.toLowerCase(), function() {});
  });
};

createModel.run = function(modelName, cb) {
  fs.exists('./server/models/' + S(modelName).humanize().s + '.js', function(exists) {
    if (!exists) {
      fs.readFile('./console/storage/model/model.js.proto', 'utf8', function (err, data) {
        if (err) {
          console.log(err)
        } else {
          data = S(data).replaceAll('/*model_name_l*/', modelName).s;
          data = S(data).replaceAll('/*model_name_f_u*/', S(modelName).humanize().s).s;
          fs.writeFile('./server/models/' + S(modelName).humanize().s + '.js', data, function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log('End create model.'.yellow);
              cb();
            }
          });
        }
      });
    } else {
      console.log('Model already exist.'.yellow);
      cb();
    }
  });
};

// Assign model to exports
exports = module.exports = createModel;
