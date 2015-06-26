var Router = require('regex-router');
var streaming = require('streaming');
var sv = require('sv');
var _ = require('lodash');

var excel = require('../lib/excel');

var R = new Router();

/** zipKeysFn(keys: string[]) => (values: any[]) => {[index: string]: any}

Create a function closure around an Array of unique keys, which takes an Array
of values and returns an object mapping the keys in values in the given order.

For example:

    zipKeysFn(['name', 'age])(['Chris', 25]) => {name: 'Chris', age: 25}
*/
function zipKeysFn(keys) {
  return function(values) {
    var pairs = _.zip(keys, values);
    return _.object(pairs);
  };
}

/** POST /util/parse-table

Parse csv-like input flexibly and write out json to response */
R.post(/\/util\/parse-table/, function(req, res) {
  var content_type = req.headers['content-type'];
  if (content_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    req.readToEnd(function(err, data) {
      if (err) return res.die(err);

      // rows: string[][]
      var rows = excel.parseZip(data);
      if (rows instanceof Error) {
        return res.die(rows);
      }

      var columns = rows[0];
      var objects = rows.slice(1).map(zipKeysFn(columns));
      // result is now a {columns: [String], rows: [Object]} object
      res.setHeader('X-Columns', columns.join(','));
      res.json(objects);
    });
  }
  else {
    // prepare transforms
    var parser = (content_type == 'application/json') ? new streaming.json.Parser() : new sv.Parser();
    var stringifier = new streaming.json.ArrayStringifier();
    // set headers
    res.setHeader('content-type', 'application/json');
    // pipe all the streams together
    req.pipe(parser).pipe(stringifier).pipe(res);
  }
});

module.exports = R.route.bind(R);
