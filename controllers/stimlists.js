'use strict'; /*jslint node: true, es5: true, indent: 2 */
var url = require('url');
var mechturk = require('mechturk');
var _ = require('underscore');
var amulet = require('amulet');
var misc = require('../misc');
var models = require('../models');
var logger = require('../logger');
var Router = require('regex-router');

var R = new Router();
var authR = new Router();

// /stimlists
module.exports = function(m, req, res) {
  var workerId = req.cookies.get('workerId');
  var ticket = req.cookies.get('ticket');
  models.User.withTicket(workerId, ticket, function(err, user) {
    logger.maybe(err);
    if (user && user.superuser) {
      req.user = user;
      authR.route(req, res);
    }
    else {
      R.route(req, res);
    }
  });
};

// /stimlists/new -> create new Stimlist and redirect to edit it.
authR.get(/^\/stimlists\/new/, function(m, req, res) {
  var stimlist = new models.Stimlist({creator: req.user._id});
  stimlist.save(function(err) {
    logger.maybe(err);
    res.redirect('/stimlists/' + stimlist._id + '/edit');
  });
});

// /stimlists/:stimlist_id/edit -> edit existing Stimlist
authR.get(/^\/stimlists\/(\w+)\/edit/, function(m, req, res) {
  models.Stimlist.findById(m[1], function(err, stimlist) {
    logger.maybe(err);
    amulet.stream(['layout.mu', 'stimlists/edit.mu'], {stimlist: stimlist}).pipe(res);
  });
});

// /stimlists/:stimlist_id/:index -> show single existing Stimlist
authR.get(/^\/stimlists\/(\w+)\/edit/, function(m, req, res) {
  models.Stimlist.findById(m[1], function(err, stimlist) {
    logger.maybe(err);
    amulet.stream(['stimlists/edit.mu'], {stimlist: stimlist}).pipe(res);
  });
});

authR.patch(/^\/stimlists\/(\w+)/, function(m, req, res) {
  req.readToEnd('utf8', function(err, stimlist_json) {
    logger.maybe(err);
    var fields = misc.parseJSON(stimlist_json);
    if (fields instanceof Error) {
      var message = 'Could not parse stimlist. Error: ' + fields.toString();
      logger.error(message);
      res.json({success: false, message: message});
    }
    else {
      models.Stimlist.findById(m[1], function(err, stimlist) {
        logger.maybe(err);
        _.extend(stimlist, fields);
        stimlist.save();
        res.json(stimlist);
      });
    }
  });
});

authR.get(/^\/stimlists\/(\w+)\/(\d+)/, function(m, req, res) {
  models.Stimlist.findById(m[1], function(err, stimlist) {
    logger.maybe(err);
    var index = parseInt(m[2], 10);
    var state = stimlist.states[index];
    amulet.stream(['stimlists/one.mu'], {state: state}).pipe(res);
  });
});

authR.get(/^\/stimlists\/?$/, function(m, req, res) {
  models.Stimlist.find(function(err, stimlists) {
    logger.maybe(err);
    amulet.stream(['layout.mu', 'admin/layout.mu', 'stimlists/all.mu'], {stimlists: stimlists}).pipe(res);
  });
});

authR.default = function(m, req, res) {
  R.route(req, res);
};

R.default = function(m, req, res) {
  res.die('No action there.');
};

R.get(/^\/stimlists\/(.+)/, function(m, req, res) {
  var slug = m[1];
  // logger.info('request', {url: urlObj, headers: req.headers});
  // a normal turk request looks like: urlObj.query =
  // { assignmentId: '2NXNWAB543Q0EQ3C16EV1YB46I8620K',
  //   hitId: '2939RJ85OZIZ4RKABAS998123Q9M8NEW85',
  //   workerId: 'A9T1WQR9AL982W',
  //   turkSubmitTo: 'https://www.mturk.com' },

  var urlObj = url.parse(req.url, true);
  var workerId = (urlObj.query.workerId || req.cookies.get('workerId') || '').replace(/\W+/g, '');
  var ctx = {
    assignmentId: urlObj.query.assignmentId,
    hitId: urlObj.query.hitId,
    workerId: workerId,
    host: urlObj.query.debug !== undefined ? '' : (urlObj.query.turkSubmitTo || 'https://www.mturk.com'),
    task_started: Date.now(),
  };
  req.cookies.set('workerId', workerId);

  models.User.fromId(workerId, function(err, user) {
    logger.maybe(err);
    models.Stimlist.findOne({slug: slug}, function(err, stimlist) {
      logger.maybe(err);
      ctx.stimlist = stimlist;
      console.log(ctx);
      amulet.stream(['layout.mu', 'stimlists/one.mu'], ctx).pipe(res);
    });
  });
});