var Router = require('regex-router');
var db = require('../../db');
var models = require('../../models');
var url = require('url');

var R = new Router(function(req, res) {
  res.status(404).die('No resource at: ' + req.url);
});

/**
GET /api/responses
*/
R.get(/^\/api\/responses(\?|$)/, function(req, res) {
  var urlObj = url.parse(req.url, true);

  // set a maximum limit at 1000, but default it to 250
  var limit = Math.min(urlObj.query.limit || 250, 1000);

  var select = db.Select('responses, participants, stims')
  .where('participants.id = responses.participant_id')
  .where('stims.id = responses.stim_id')
  .add([
    '*',
    // 'id' and 'created' from the other tables conflict with responses
    'responses.id AS id',
    'responses.created AS created',
    // count how many responses there are in all (i.e., outside the LIMIT)
    'COUNT(responses.id) OVER() AS count',
  ])
  .orderBy('responses.created DESC')
  .limit(limit);

  if (urlObj.query.aws_worker_id) {
    select = select.whereEqual({
      aws_worker_id: urlObj.query.aws_worker_id
    });
  }

  select.execute(function(err, responses) {
    if (err) return res.die(err);
    res.ngjson(responses);
  });
});

/**
GET /api/responses/:id
*/
R.get(/^\/api\/responses\/(\d+)$/, function(req, res, m) {
  models.Response.one({id: m[1]}, function(err, response) {
    if (err) return res.die(err);
    res.json(response);
  });
});

module.exports = R.route.bind(R);