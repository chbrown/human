'use strict'; /*jslint node: true, es5: true, indent: 2 */
var formidable = require('formidable');
var amulet = require('amulet');
var sv = require('sv');
var misc = require('../misc');
var logger = require('../logger');
var User = require('../models').User;
var Router = require('regex-router');
var R = new Router();

// /
module.exports = function(m, req, res) {
  R.route(req, res);
};

R.default = function(m, req, res) {
  var default_url = '/aircraft';
  console.log('Redirecting request for ' + req.url + ' to ' + default_url);
  res.redirect(default_url);
};

R.post(/^\/seen$/, function(m, req, res) {
  new formidable.IncomingForm().parse(req, function(err, fields, files) {
    // and the fields: workerId, and "questionIds[]" that equates to a list of strings
    // which is just multiple 'questionIds[] = string1' fields (I think).
    var workerId = (req.cookies.get('workerId') || fields.workerId || 'none').replace(/\W+/g, '');
    User.fromId(workerId, function(err, user) {
      logger.maybe(err);
      var questionIds = fields['questionIds[]'];
      if (!Array.isArray(questionIds)) questionIds = questionIds ? [questionIds] : [];
      questionIds.forEach(function(questionId) {
        user.seen.push(questionId);
      });
      user.save(logger.maybe);
      // res.json({success: false, message: 'Could not find worker with ID: "' + workerId + '"'});
      res.json({success: true, message: 'Added ' + questionIds.length + ' to seen.'});
    });
  });
});

R.post(/^\/mturk\/externalSubmit/, function(m, req, res) {
  new formidable.IncomingForm().parse(req, function(err, fields, files) {
    var workerId = (fields.workerId || req.cookies.get('workerId') || 'none').replace(/\W+/g, '');
    User.fromId(workerId, function(err, user) {
      logger.maybe(err);
      user.responses.push(fields);
      user.save(logger.maybe);
      amulet.render(res, ['layout.mu', 'done.mu'], {});
    });
  });
});

R.any(/^\/responses/, function(m, req, res) {
  var workerId = (req.cookies.get('workerId') || 'none').replace(/\W+/g, '');
  logger.info('Saving response.', {workerId: workerId});
  req.readBuffer(function(err, buffer) {
  // req.on('end', function() {
    // need to check this json parse
    var string = buffer.toString();
    var response = misc.parseJSON(string);
    if (response instanceof Error) {
      var message = 'Could not parse response, "' + string + '". Error: ' + response.toString();
      logger.error(message);
      res.json({success: false, message: message});
    }
    else {
      response.submitted = new Date();
      User.fromId(workerId, function(err, user) {
        logger.maybe(err);
        user.responses.push(response);
        user.save(logger.maybe);
        res.json({success: true, message: 'Saved response for user: ' + workerId});
      });
    }
  });
});

R.post(/^\/addbonus/, function(m, req, res) {
  var default_bonus = 0.25;
  var max_bonus = 0.25;
  // var unpaid_minimum = 49;
  new formidable.IncomingForm().parse(req, function(err, fields, files) {
    var workerId = (fields.workerId || req.cookies.get('workerId') || 'none').replace(/\W+/g, '');
    User.fromId(workerId, function(err, user) {
      logger.maybe(err);
      var amount = Math.min(parseFloat(fields.amount || default_bonus), max_bonus);
      var previous_bonus_owed = user.bonus_owed;
      // res.json({success: false, message: 'Could not find user: ' + workerId});
      user.bonus_owed = previous_bonus_owed + amount;
      user.save(function(err) {
        if (err) {
          logger.error(err);
          res.json({success: false, message: 'Error assigning bonus: ' + err.toString(), amount: amount});
        }
        else {
          logger.info('User bonus_owed increased from ' + previous_bonus_owed +
            ' by ' + amount + ' to ' + (previous_bonus_owed + amount) + '.');
          res.json({success: true, message: 'Bonus awarded: $' + amount, amount: amount});
        }
      });
    });
  });
});

R.post(/^\/sv$/, function(m, req, res) {
  // res.writeHead(200, {'Content-Type': 'text/csv'});
  // req
  //   .pipe(new sv.Parser());
  //   .pipe(new sv.Stringifier({delimiter: ','}))
  //   .pipe(res);
  var rows = [];
  req.pipe(new sv.Parser())
    .on('data', function(row) {
      rows.push(row);
    })
    .on('end', function() {
      res.json(rows);
    });
});