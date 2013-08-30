/*
 * server/winston.js
 */

'use strict';

var path = require('path');

var expressWinston = require('express-winston'),
    winston = require('winston'),
    winstonMongoDB = require('winston-mongodb');

var _app = null;

var _vcapMongo = {};
if (process.env.VCAP_SERVICES) {
  _vcapMongo = JSON.parse(process.env.VCAP_SERVICES);
  _vcapMongo = _vcapMongo['mongodb-1.8'][0].credentials;
}

function _setColors() {
  winston.addColors({
    silly: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  });
}

function _attachExpressLogger() {
  var server = _app.servers.express.getServer();

  var logLevels = {
    console: 'error',
    file: 'error',
    mongodb: 'error'
  };

  if (process.env.NODE_ENV === 'development') {
    logLevels.console = 'debug';
  }

  server.use(expressWinston.logger({
    transports: [
      new (winston.transports.File)({
        level: logLevels.file,
        filename: path.join(_app.project.path.log, 'express.log'),
        timestamp: true
      }),
      new (winstonMongoDB.MongoDB)({
        level: logLevels.mongodb,
        host: _vcapMongo.hostname || _app.config.db.mongo.host || 'localhost',
        port: _vcapMongo.port || _app.config.db.mongo.port || 27017,
        username: _vcapMongo.username || _app.config.db.mongo.username || null,
        password: _vcapMongo.password || _app.config.db.mongo.password || null,
        db: _vcapMongo.db || _app.config.db.mongo.db || 'ultimate-seed',
        collection: 'log-express'
      })
    ]
  }));
}

function _attachExpressErrorLogger() {
  var server = _app.servers.express.getServer();

  var logLevels = {
    console: 'error',
    file: 'error',
    mongodb: 'error'
  };

  if (process.env.NODE_ENV === 'development') {
    logLevels.console = 'debug';
  }

  server.use(expressWinston.errorLogger({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        label: 'express.error',
        level: logLevels.console
      }),
      new (winston.transports.File)({
        level: logLevels.file,
        filename: path.join(_app.project.path.log, 'express-error.log'),
        timestamp: true
      }),
      new (winstonMongoDB.MongoDB)({
        level: logLevels.mongodb,
        host: _vcapMongo.hostname || _app.config.db.mongo.host || 'localhost',
        port: _vcapMongo.port || _app.config.db.mongo.port || 27017,
        username: _vcapMongo.username || _app.config.db.mongo.username || null,
        password: _vcapMongo.password || _app.config.db.mongo.password || null,
        db: _vcapMongo.db || _app.config.db.mongo.db || 'ultimate-seed',
        collection: 'log-express-error'
      })
    ]
  }));
}

function attach(app) {
  _app = app;

  var logLevels = {
    console: 'error',
    file: 'error',
    mongodb: 'error'
  };

  var host = _vcapMongo.hostname || _app.config.db.mongo.host || 'localhost',
      port = _vcapMongo.port || _app.config.db.mongo.port || 27017,
      username = _vcapMongo.username || _app.config.db.mongo.username || null,
      password = _vcapMongo.password || _app.config.db.mongo.password || null,
      db = _vcapMongo.db || _app.config.db.mongo.db || 'ultimate-seed';

  if (process.env.NODE_ENV === 'development') {
    logLevels.console = 'debug';
  }

  _app.logger = new (winston.Logger)({
    exceptionHandlers: [
      new (winston.transports.Console)({
        json: true
      }),
      new (winston.transports.File)({
        level: logLevels.file,
        filename: path.join(_app.project.path.log, 'exceptions.log'),
        timestamp: true
      }),
      new (winstonMongoDB.MongoDB)({
        level: logLevels.mongodb,
        host: host,
        port: port,
        username: username,
        password: password,
        db: db,
        collection: 'log-exceptions'
      })
    ],
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        label: 'app',
        level: logLevels.console
      }),
      new (winston.transports.File)({
        level: logLevels.file,
        filename: path.join(_app.project.path.log, 'app.log'),
        timestamp: true
      }),
      new (winstonMongoDB.MongoDB)({
        level: logLevels.mongodb,
        host: host,
        port: port,
        username: username,
        password: password,
        db: db,
        collection: 'log-app'
      })
    ]
  });

  _app.registerWinstonLogger = _attachExpressLogger;
  _app.registerWinstonErrorLogger = _attachExpressErrorLogger;
}

// Initialize
_setColors();

// Public API
exports.attach = attach;
