#!/usr/bin/env node
'use strict'; /*jslint node: true, es5: true, indent: 2 */
var path = require('path');
var http = require('http-enhanced');
var logger = require('./lib/logger');
var models = require('./lib/models');

// amulet.set(), as opposed amulet.create(), will set the defaults on the module singleton
var amulet = require('amulet').set({
  minify: true,
  root: path.join(__dirname, 'templates'),
  globals: {
    'JSON': JSON,
    'datefmt': function(date) {
      return (date && date.toISOString) ? date.toISOString().split('T')[0] : date;
    },
    'datetimefmt': function(date) {
      return (date && date.toISOString) ? date.toISOString().split('.')[0].replace(/T/, ' ') : date;
    },
    'truncate': function(string, max) {
      return (string && string.length > max) ? (string.slice(0, max - 3) + '...') : string;
    },
  }
});

var Cookies = require('cookies');
Cookies.prototype.defaults = function() {
  var expires = new Date(Date.now() + 31*86400*1000); // 1 month out
  return {path: '/', expires: expires};
};

var optimist = require('optimist')
  .describe({
    hostname: 'hostname to listen on',
    port: 'port to listen on',

    database: 'name of the mongodb database',
    database_host: 'hostname serving mongo',
    database_port: 'port serving mongo',

    help: 'print this help message',
    verbose: 'print extra output',
    version: 'print version',
  })
  .boolean(['help', 'verbose', 'version'])
  .alias({verbose: 'v'})
  .default({
    hostname: '127.0.0.1',
    port: 1451,

    database: 'turkserv',
    database_host: 'localhost',
    database_port: 27017,
  });

var argv = optimist.argv;
logger.level = argv.verbose ? 'debug' : 'info';

if (argv.help) {
  optimist.showHelp();
}
else if (argv.version) {
  console.log(require('./package').version);
}
else {
  var root_controller = require('./controllers');

  logger.debug('connecting to mongodb://%s:%d/%s', argv.database_host, argv.database_port, argv.database);
  models.mongoose.connect(argv.database_host, argv.database, argv.database_port);

  http.createServer(function(req, res) {
    req.cookies = new Cookies(req, res);
    req.user_id = req.cookies.get('workerId');

    var started = Date.now();
    res.on('finish', function() {
      logger.debug('duration', {url: req.url, method: req.method, ms: Date.now() - started});
    });

    // root_controller has signature of (req, res), just like any other controller module
    root_controller(req, res);
  }).listen(argv.port, argv.hostname, function() {
    logger.info('listening on http://%s:%d', argv.hostname, argv.port);
  });
}
