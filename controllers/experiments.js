var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var async = require('async');
var handlebars = require('handlebars');
var logger = require('loge');
var Router = require('regex-router');
var sv = require('sv');
var url = require('url');

var db = require('../db');
var models = require('../models');

var _cached_stim_template; // a Handlebars template function
function getStimTemplate(callback) {
  if (_cached_stim_template) {
    callback(null, _cached_stim_template);
  }
  else {
    var stim_template_filepath = path.join(__dirname, '..', 'ui', 'stim.html');
    fs.readFile(stim_template_filepath, {encoding: 'utf8'}, function(err, stim_template) {
      if (err) return callback(err);
      _cached_stim_template = handlebars.compile(stim_template);
      callback(null, _cached_stim_template);
    });
  }
}

var R = new Router(function(req, res) {
  res.status(404).die('No resource at: ' + req.url);
});

/** the Amazon Mechanical Turk frame will give us the following variables:

  https://tictactoe.amazon.com/gamesurvey.cgi?gameid=01523
     &assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE
     &hitId=123RVWYBAZW00EXAMPLE
     &turkSubmitTo=https://www.mturk.com
     &workerId=AZ3456EXAMPLE
*/

/** GET /experiments/:experiment_id
Redirect to first stim of experiment
*/
R.get(/^\/experiments\/(\d+)(\?|$)/, function(req, res, m) {
  var experiment_id = m[1];

  db.Select('stims')
  .where('experiment_id = ?', experiment_id)
  .orderBy('view_order')
  .limit(1)
  .execute(function(err, stims) {
    if (err) return res.die(err);
    if (stims.length === 0) return res.die('No available stims');

    var urlObj = url.parse(req.url, true);
    urlObj.pathname = '/experiments/' + experiment_id + '/stims/' + stims[0].id;
    var stim_url = url.format(urlObj);

    res.redirect(stim_url);
  });
});

/** GET /experiments/:experiment_id/stims/:stim_id
Render stim as html
*/
R.get(/^\/experiments\/(\d+)\/stims\/(\d+)(\?|$)/, function(req, res, m) {
  var experiment_id = m[1];
  var stim_id = m[2];

  async.auto({
    experiment: function(callback) {
      models.Experiment.one({id: experiment_id}, callback);
    },
    stim: function(callback) {
      models.Stim.one({id: stim_id}, callback);
    },
    template: ['stim', function(callback, results) {
      models.Template.one({id: results.stim.template_id}, callback);
    }],
  }, function(err, results) {
    if (err) return res.die(err);

    // stim_globals is given to all stims, in case they want the values.
    // it's mostly metadata, compared to the states.
    var urlObj = url.parse(req.url, true);

    // context: the current state to render the template with
    // urlObj.query will usually have the fields: assignmentId, hitId, turkSubmitTo, workerId
    var context = _.extend(results.stim.context || {}, urlObj.query, {
      experiment_id: experiment_id,
      stim_id: stim_id,
    });

    // need a better default for missing html
    var template_html = results.template.html;
    var rendered_html = template_html;
    try {
      rendered_html = handlebars.compile(template_html)(context);
    }
    catch (exc) {
      logger.error('Error compiling template markup', exc);
    }

    getStimTemplate(function(err, stim_template) {
      if (err) return res.die(err);

      var stim_html = stim_template({
        context: JSON.stringify(context).replace(/<\//g, '<\\/'),
        header: results.experiment.html,
        html: rendered_html,
      });
      res.html(stim_html);
    });
  });
});

/** POST /experiments/:experiment_id/stims/:stim_id
Save response
*/
R.post(/^\/experiments\/(\d+)\/stims\/(\d+)(\?|$)/, function(req, res, m) {
  var experiment_id = m[1];
  var stim_id = m[2];
  var urlObj = url.parse(req.url, true);

  req.readData(function(err, data) {
    if (err) return res.die(err);

    var aws_worker_id = urlObj.query.workerId || 'WORKER_ID_NOT_AVAILABLE';
    // logger.debug('Inserting response', {aws_worker_id: aws_worker_id, data: data});

    var ready = function(err) {
      if (err) return res.die(err);

      models.Stim.nextStimId(experiment_id, stim_id, function(err, next_stim_id) {
        if (err) return res.die(err);

        // http://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkAPI/ApiReference_ExternalQuestionArticle.html
        // sadly, this redirect_to doesn't work. Hopefully the user will have a proper
        // POST-to-MT form in their last stim
        var redirect_to = urlObj.query.turkSubmitTo + '/mturk/externalSubmit?assignmentId=' + urlObj.query.assignmentId;
        if (next_stim_id) {
          // only change the path part of the url
          urlObj.pathname = '/experiments/' + experiment_id + '/stims/' + next_stim_id;
          redirect_to = url.format(urlObj);
        }

        var ajax = req.headers['x-requested-with'] == 'XMLHttpRequest';
        if (ajax) {
          res.setHeader('Location', redirect_to);
          res.end();
        }
        else {
          res.redirect(redirect_to);
        }
      });
    };

    if (data) {
      models.Participant.addResponse({
        aws_worker_id: aws_worker_id,
        ip_address: req.headers['x-real-ip'] || req.client.remoteAddress,
        user_agent: req.headers['user-agent'],
      }, {
        stim_id: stim_id,
        value: data,
      }, ready);
    }
    else {
      ready();
    }
  });
});

/** GET /experiments/:experiment_id/responses?token=ABCDEF12345

Requires authorization, but only by access token.
Show only the responses that reference this Experiment. */
R.get(/^\/experiments\/(\d+)\/responses(\?|$)/, function(req, res, m) {
  var experiment_id = m[1];

  var urlObj = url.parse(req.url, true);
  models.AccessToken.check(urlObj.query.token, 'experiments', experiment_id, function(err) {
    if (err) return res.die(err);

    // yay, authorization granted

    db.Select('responses, participants, stims')
    .where('participants.id = responses.participant_id')
    .where('stims.id = responses.stim_id')
    .add('responses.*', 'stims.context', 'stims.experiment_id', 'participants.name', 'participants.aws_worker_id')
    .whereEqual({experiment_id: experiment_id})
    .orderBy('responses.id DESC')
    .execute(function(err, responses) {
      if (err) return res.die(err);

      var writer = req.createWriter();
      writer.pipe(res);
      responses.forEach(function(response) {
        var response_object = {
          response_id: response.id,
          participant_id: response.participant_id,
          participant_name: response.name || response.aws_worker_id,
          experiment_id: response.experiment_id,
          stim_id: response.stim_id,
          created: response.created,
        };
        // merge those static values with the dynamic context and value objects,
        // using _.defaults so that further-left arguments have priority
        var row = _.defaults(response.value, response_object, response.context);
        writer.write(row);
      });
      writer.end();
    });
  });
});

module.exports = R.route.bind(R);
