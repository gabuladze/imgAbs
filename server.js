'use strict';

var express = require('express');
var api = require('./app/api/api.js');
var routes = require('./app/routes/index.js');
var mongodb = require('mongodb').MongoClient;
var app = express();
var dbUrl = process.env.MONGOLAB_URI || "mongodb://localhost/imgabs"

mongodb.connect(dbUrl, function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log("Connected to MongoDB!");
  }

  db.createCollection("queries", {
    capped: true,
    size: 5242880,
    max: 50
  });

  routes(app, db);
  api(app, db);

  var port = process.env.PORT || 3500;
  app.listen(port, function() {
    console.log("Server started on port " + port + "!");
  });

})
