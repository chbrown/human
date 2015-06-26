var _ = require('lodash');
var db = require('../../db');
var models = require('../../models');
var Router = require('regex-router');

var R = new Router();

var access_tokens_columns = ['token', 'relation', 'foreign_id', 'expires', 'redacted', 'created'];

/** GET /api/access_tokens
List all access tokens. */
R.get(/^\/api\/access_tokens$/, function(req, res) {
  db.Select('access_tokens')
  .orderBy('id ASC')
  .execute(function(err, access_tokens) {
    if (err) return res.die(err);
    res.ngjson(access_tokens);
  });
});

/** GET /api/access_tokens/new
Generate blank access token. */
R.get(/^\/api\/access_tokens\/new$/, function(req, res) {
  res.json({});
});

/** POST /api/access_tokens
Create new access token. */
R.post(/^\/api\/access_tokens$/, function(req, res) {
  req.readData(function(err, data) {
    if (err) return res.die(err);

    var fields = _.pick(data, access_tokens_columns);

    db.Insert('access_tokens')
    .set(fields)
    .returning('*')
    .execute(function(err, rows) {
      if (err) return res.die(err);
      res.status(201).json(rows[0]);
    });
  });
});

/** GET /api/access_tokens/:id
Show existing access token. */
R.get(/^\/api\/access_tokens\/(\d+)$/, function(req, res, m) {
  db.SelectOne('access_tokens')
  .whereEqual({id: m[1]})
  .execute(function(err, access_token) {
    if (err) return res.die(err);

    res.json(access_token);
  });
});

/** POST /api/access_tokens/:id
Update existing access token. */
R.post(/^\/api\/access_tokens\/(\d+)/, function(req, res, m) {
  req.readData(function(err, data) {
    if (err) return res.die(err);

    var fields = _.pick(data, access_tokens_columns);

    db.Update('access_tokens')
    .setEqual(fields)
    .whereEqual({id: m[1]})
    .execute(function(err) {
      if (err) return res.die(err);
      res.status(204).end(); // 204 No Content
    });
  });
});

/** DELETE /api/access_tokens/:id
Delete existing access token. */
R.delete(/^\/api\/access_tokens\/(\d+)$/, function(req, res, m) {
  db.Delete('access_tokens')
  .whereEqual({id: m[1]})
  .execute(function(err) {
    if (err) return res.die(err);
    res.status(204).end();
  });
});

/** POST /api/access_tokens/generate

Example data:
  relation: experiments
  id: 23
  length: 10

Generate or find existing access token, and return it. */
R.post(/^\/api\/access_tokens\/generate(\?|$)/, function(req, res) {
  req.readData(function(err, data) {
    if (err) return res.die(err);

    // only allow 'experiments' from this API call, for the moment
    var relation = data.relation || null;
    if (relation != 'experiments') {
      relation = null;
    }
    var foreign_id = data.id || null;
    var length = parseInt(data.length || 10, null);

    // try to use an existing access token
    models.AccessToken.findOrCreate(relation, foreign_id, {length: length}, function(err, access_token) {
      if (err) return res.die(err);

      var url = ['', relation, foreign_id].join('/') + '?token=' + access_token.token;
      res.status(201);
      // setHeader is not chainable
      res.setHeader('Location', url);
      res.json(access_token);
    });

  });
});

module.exports = R.route.bind(R);
