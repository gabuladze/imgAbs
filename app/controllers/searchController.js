'use strict';

var Query = require('../models/queryModel');

exports.index = function(req, res) {
  res.json({"err": "Invalid search string"});
}

exports.searchImage = function(req, res) {
  var term = req.params.term;
  var offset = req.query.offset;

  Query.save(term, db, function(err, result) {
    if (err) throw err;
  });

  getImages(res, term, offset);
};

exports.getImage = function(res, term, offset) {
  
};

exports.getQueries = function(req, res) {

}
