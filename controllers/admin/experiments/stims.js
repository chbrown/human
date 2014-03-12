/*jslint node: true */
var _ = require('underscore');
var logger = require('loge');
var Router = require('regex-router');
var sqlcmd = require('sqlcmd');

var db = require('../../../lib/db');
var models = require('../../../lib/models');

var R = new Router(function(req, res) {
  res.die(404, 'No resource at: ' + req.url);
});

/** GET /admin/experiments/:experiment_id/stims
list all of an experiment's stims */
R.get(/stims(\/|.json)?$/, function(req, res, m) {

  new sqlcmd.Select({table: 'stims'})
  .where('experiment_id = ?', req.experiment.id)
  .orderBy('view_order')
  .execute(db, function(err, stims) {
    if (err) return res.die(err);

    req.ctx.stims = stims;
    res.adapt(req, req.ctx, ['admin/layout.mu', 'admin/experiments/stims/all.mu']);
  });
});

/** POST /admin/experiments/:experiment_id/stims
Create new stim */
R.post(/stims\/?$/, function(req, res, m) {
  req.readData(function(err, data) {
    if (err) return res.die(err);

    var fields = _.pick(data, models.Stim.columns);

    new sqlcmd.Insert({table: 'stims'})
    .set({experiment_id: req.experiment.id})
    // also need to generate view_order!?
    .setIf(fields)
    .execute(db, function(err, rows) {
      if (err) return res.die(err);

      res.json(rows[0]);
    });
  });
});

/** GET /admin/experiments/:experiment_id/stims/:stim_id
Show / edit single stim */
R.get(/stims\/(\d+)$/, function(req, res, m) {
  models.Stim.from({id: m[1]}, function(err, stim) {
    if (err) return res.die(err);

    req.ctx.stim = stim;
    res.adapt(req, req.ctx, ['admin/layout.mu', 'admin/experiments/stims/one.mu']);
  });
});

/** PATCH /admin/experiments/:experiment_id/stims/:stim_id
Update existing stim. */
R.patch(/stims\/(\d+)$/, function(req, res, m) {
  var stim_id = m[1];
  // models.Stim.from({id: stim_id}, function(err, stim) {
  req.readData(function(err, data) {
    if (err) return res.die(err);

    var fields = _.pick(data, models.Stim.columns);

    new sqlcmd.Update({table: 'stims'})
    .setIf(fields)
    .where('id = ?', stim_id)
    .execute(db, function(err, rows) {
      if (err) return res.die(err);

      res.json(fields);
    });
  });
});

/** DELETE /admin/experiments/:experiment_id/stims/:stim_id
Delete Stim */
R.delete(/stims\/(\d+)$/, function(req, res, m) {
  var stim_id = m[1];

  // first delete the dependents
  new sqlcmd.Delete({table: 'responses'})
  .where('stim_id = ?', stim_id)
  .execute(db, function(err, rows) {
    if (err) return res.die(err);

    // then delete the stim
    new sqlcmd.Delete({table: 'stims'})
    .where('id = ?', m[1])
    .execute(db, function(err, rows) {
      if (err) return res.die(err);

      res.json({message: 'Deleted stim'});
    });
  });
});

// req.experiment should be set before this module is called
module.exports = R.route.bind(R);
