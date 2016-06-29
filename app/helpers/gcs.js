'use strict'

var https = require('https');

var baseUrl = "https://www.googleapis.com/customsearch/v1?key="+
  process.env.API_KEY
  +"&fields=items(snippet,pagemap(cse_thumbnail/src,imageobject/url))&cx="+
  process.env.ENGINE_ID
  +"&q=";
//OFFSET
exports.fetch = function(term, offset, callback) {
  if (term.length < 1) {
    var err = new Error("Invalid Search Term!");
    callback(err, null);
  }

  search(term, callback);
}

function search(term, callback) {
  var url = baseUrl + term;
  https.get(url, function(res) {
    var body = "";
    res.setEncoding('utf8');
    res.on("data", function(d) {
      body += d;
    });
    res.on("end", function() {
      var result = format(body);
      callback(null, result);
    })
  });
}

function format(rawData) {
  var result = [];
  var data = JSON.parse(rawData);
  data.items.forEach(function(item) {
    if(item["pagemap"].hasOwnProperty("imageobject")) {
      var image = {
        "url": item["pagemap"]["imageobject"][0]["url"],
        "snippet": item["snippet"],
        "thumbnail": item["pagemap"]["cse_thumbnail"][0]["src"]
      };
      result.push(image);
    }
  });

  return result;
}
