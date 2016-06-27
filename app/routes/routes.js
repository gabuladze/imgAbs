'use strict';

var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController.js');
var pagesController = require('../controllers/pagesController.js');

router.route("/")
  .get(pagesController.home);

router.route("/imagesearch")
  .get(searchController.index);
router.route("/imagesearch/:term")
  .get(searchController.searchImage);
router.route("/latest/imagesearch")
  .get(searchController.getQueries);

module.exports = router;
