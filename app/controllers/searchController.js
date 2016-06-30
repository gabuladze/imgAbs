'use strict';

var Query = require('../models/queryModel');
var Gcs = require('../helpers/gcs.js');

exports.index = function(req, res) {
  res.json({"err": "Invalid search string"});
}

exports.searchImage = function(req, res) {
  var term = req.params.term;
  var offset = req.query.offset;

  Query.save(term, function(err, result) {
    if (err) throw err;
  });

  Gcs.fetch(term, offset, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
};

exports.getQueries = function(req, res) {
  Query.get(function(err, result) {
    if (err) res.sendStatus(err.status);
    res.json(result);
  })
}
