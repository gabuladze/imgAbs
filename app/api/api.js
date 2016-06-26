'use strict';

var Flickr = require("flickrapi"),
  flickrOptions = {
    api_key: process.env.FLICKR_API_KEY,
    secret: process.env.FLICKR_SECRET
  }

module.exports = function(app, db) {
  app.route("/imagesearch/:term")
    .get(searchImage);

  app.route("/latest/imagesearch")
    .get(getQueries);

  function searchImage(req, res) {
    var term = req.params.term;
    var offset = req.query.offset;

    saveQuery(term);
    getImages(term, offset);
  }

  function getQueries(req, res) {
    var collection = db.collection("queries");
    collection.find({}, { _id: 0 }, function(err, result) {
      if (err) throw err;
      if(result) {
        console.log("FOUND" + result);
        res.json(result);
      }
    }).limit(10);
  }

  function getImages(term, offset) {
    if(offset) {
      Flickr.tokenOnly(flickrOptions, function(err, flickr) {
        flickr.photos.search({
          text: term,
          per_page: offset,
          extras: 'description, url_s'
        }, function(err, result) {
          if (err) throw err;
          res.json(result);
        })
      });
    } else {
      Flickr.tokenOnly(flickrOptions, function(err, flickr) {
        flickr.photos.search({ text: term, },
          function(err, result) {
            if (err) throw err;
            res.json(result);
          })
      });
    }
  }

  function saveQuery(term) {
    if (term.length === 0) res.json({"err": "Invalid search term"});
    var query = {
      "term": term,
      "when": Date.now().toDateString()
    };

    var collection = db.collection("queries");
    collection.insertOne(query, function(err, result) {
      if (err) throw err;
    });
  }
};
