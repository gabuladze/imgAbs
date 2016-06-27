'use strict';

process.env.PWD = process.cwd();
var path = require('path');

exports.home = function(req, res) {
  var index = path.join(process.env.PWD, "/public/index.html");
  res.sendFile(index, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(err.status);
    } else {
      console.log("SENT " + index);
    }
  });
};
