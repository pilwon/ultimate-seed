#!/usr/bin/env node

/*
 * console/index.js
 */

'use strict';

var S = require('string'),
    program = require('commander');
    require('colors');

var createModule = require('./module'),
    createPage = require('./page'),
    createModel = require('./model'),
    createController = require('./controller'),
    createResource = require('./resource'),
    createCRUD = require('./crud');

program
  .version('0.1.0')
  .usage('[command]')

 program
  .command('module')
  .description('Create Angular module'.yellow)
  .action(function(){
    createModule.command();
  });

 program
  .command('page')
  .description('Create Angular page'.yellow)
  .action(function(){
    createPage.command();
  });

 program
  .command('resource')
  .description('Create Angular Resource for Model'.yellow)
  .action(function(){
    createResource.command();
  });

 program
  .command('model')
  .description('Create Mongo model'.yellow)
  .action(function(){
    createModel.command();
  });

 program
  .command('controller')
  .description('Create Express controller'.yellow)
  .action(function(){
    createController.command();
  });

 program
  .command('crud')
  .description('Create CRUD'.yellow)
  .action(function(){
    createCRUD.command();
  });

program.parse(process.argv);
