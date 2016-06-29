'use strict';

var mongoose = require('mongoose');
var dbUrl = process.env.MONGOLAB_URI || "mongodb://localhost/imgabs"

mongoose.connect(dbUrl);

var querySchema = mongoose.Schema({
  term: String,
  date: { type: Date, default: Date.now }
});

var Query = mongoose.model('Query', querySchema);

exports.get = function(callback) {
  Query.find({}, { _id: 0 }, function(err, result) {
    if (err) throw err;
    if(result) {
      callback(null, result);
    }
  }).limit(10);
}

exports.save = function(term, callback) {
  if(term.length === 0) throw new Error("Invalid Search Term!");
  var query = new Query({ term: term });
  query.save(callback);
}
