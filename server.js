'use strict';

var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var dbUrl = process.env.MONGOLAB_URI || "mongodb://localhost/imgabs"

var routes = require('./app/routes/routes.js');

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

  app.use(routes);

  var port = process.env.PORT || 3500;
  app.listen(port, function() {
    console.log("Server started on port " + port + "!");
  });

})
