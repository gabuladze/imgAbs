'use strict';

exports.get = function(db, callback) {
  var collection = db.collection("queries");
  collection.find({}, { _id: 0 }, function(err, result) {
    if (err) throw err;
    if(result) {
      callback(null, result);
    }
  }).limit(10);
}

exports.save = function(term, db, callback) {
  if(term.length === 0) throw new Error("Invalid Search Term!");

  var date = Date.now();
  var query = {
    "term": term,
    "when": date
  };
  var collection = db.collection("queries");
  collection.insertOne(query, callback(err, result));
}
