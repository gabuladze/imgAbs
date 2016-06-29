'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3500;
var routes = require('./app/routes/routes.js');

app.use(routes);

app.listen(port, function() {
  console.log("Server started on port " + port + "!");
});
