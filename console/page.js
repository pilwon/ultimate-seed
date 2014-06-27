/*
 * console/page.js
 */

'use strict';

var fs = require('fs'),
    S = require('string'),
    q = require('q'),
    prompt = require('prompt');

require('colors');

var createModule = require('./module');

// Create new Angular page
var createPage = {};

prompt.start();

createPage.command = function() {
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

    createPage.run(result.module_name.toLowerCase(), result.page_name.toLowerCase(), result.model_name.toLowerCase(), function() {});
  });
};

createPage.run = function(module, page, model, cb) {

  fs.exists('./client/js/'+module+'/index.js', function(exists) {
    if (!exists) {
      createModule.run(module, function() {
        createPage.doCreate(module, page, model, cb);
      });
    } else {
      createPage.doCreate(module, page, model, cb);
    }
  });
};

createPage.doCreate = function(moduleName, pageName, modelName, cb) {
  fs.exists('./client/js/' + moduleName + '/controllers/' + pageName + '.js', function(exists) {
    if (!exists) {
      var findStr, expr = '';

      mkFile(
        'page.js.proto',
        'controllers/' + pageName + '.js',
        pageName,
        modelName,
        moduleName
      ).then(function(){
        return mkFile(
          'page.html.proto',
          'templates/' + pageName + '.html',
          pageName,
          modelName,
          moduleName
        );
      }).then(function() {
        var deferredReadIndex = q.defer();
        fs.readFile('./client/js/' + moduleName + '/index.js', 'utf8', function (err, data) {
          if (err) {
            deferredReadIndex.reject(err);
          } else {
            findStr = '' +
              '// Controllers\n' +
              'require(\'./controllers/' + pageName + '\')(ngModule);' +
              '';
            expr = new RegExp('\/\/ Controllers', 'g');
            data = data.replace(expr, findStr);
            findStr = '' +
              '      data: {\n' +
              '        menuTitle: \'' + S(moduleName).humanize().s + '\'\n' +
              '      }\n' +
              '    }' +
              '';
            expr = new RegExp(findStr, 'g');
            findStr += '' +
              ')\n' +
              '    .state(\'app.' + moduleName + '.' + pageName + '\', {\n' +
              '      url: \'/' + pageName + '\',\n' +
              '      controller: \'' + S(pageName).humanize().s + 'Ctrl\',\n' +
              '      template: rhtml(\'./templates/' + pageName + '.html\'),\n' +
              '      data: {\n' +
              '        title: \'' + S(pageName).humanize().s + '\'\n' +
              '      }\n' +
              '    }' +
              '';
            data = data.replace(expr, findStr);
            deferredReadIndex.resolve(data);
          }
        });
        return deferredReadIndex.promise;
      }).then(function(data) {
        var deferredWriteIndex = q.defer();
        fs.writeFile('./client/js/' + moduleName + '/index.js', data, function (err) {
          if (err) {
            deferredWriteIndex.reject(err);
          } else {
            deferredWriteIndex.resolve();
          }
        });
        return deferredWriteIndex.promise;
      }).then(function() {
        var deferredReadLayout = q.defer();
        fs.readFile('./client/js/' + moduleName + '/templates/_layout.html', 'utf8', function (err, data) {
          if (err) {
            deferredReadLayout.reject(err);
          } else {
            findStr = '' +
              '<ul class="nav nav-pills nav-stacked">' +
              '';
            expr = new RegExp(findStr, 'g');
            findStr += '' +
              '\n' +
              '          <li ui-sref-active="active">\n' +
              '            <a ui-sref="app.' + moduleName + '.' + pageName + '">\n' +
              '              {{ $state.get(\'app.' + moduleName + '.' + pageName + '\').data.title }}\n' +
              '            </a>\n' +
              '          </li>' +
              '';
            data = data.replace(expr, findStr);
            deferredReadLayout.resolve(data);
          }
        });
        return deferredReadLayout.promise;
      }).then(function(data) {
        var deferredWriteLayout = q.defer();
        fs.writeFile('./client/js/' + moduleName + '/templates/_layout.html', data, function (err) {
          if (err) {
            deferredWriteLayout.reject(err);
          } else {
            deferredWriteLayout.resolve();
          }
        });
        return deferredWriteLayout.promise;
      }).then(function() {
        console.log('End create page.'.yellow);
        cb();
      });
    } else {
      console.log('Page already exist.'.yellow);
      cb();
    }
  });
};

function mkFile(pathSource, pathDest, pageName, modelName, moduleName) {
  pathDest = './client/js/' + moduleName + '/' + pathDest;
  var deferredMkFile = q.defer();
  fs.readFile('./console/storage/page/' + pathSource, 'utf8', function (err, data) {
    if (err) {
      deferredMkFile.reject(err);
    } else {
      data = S(data).replaceAll('/*module_name_l*/', pageName).s;
      data = S(data).replaceAll('/*model_name_l*/', modelName).s;
      data = S(data).replaceAll('/*module_name_f_u*/', S(pageName).humanize().s).s;
      data = S(data).replaceAll('/*model_name_f_u*/', S(modelName).humanize().s).s;
      fs.writeFile(pathDest, data, function (err) {
        if (err) {
          deferredMkFile.reject(err);
        } else {
          console.log('Create page file "'.yellow + pathDest.cyan + '".'.yellow);
          deferredMkFile.resolve();
        }
      });
    }
  });
  return deferredMkFile.promise;
}

// Assign module to exports
exports = module.exports = createPage;
