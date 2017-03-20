const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res) {
  request('https://api.themoviedb.org/3/movie/popular?api_key=76244b12adc0042d55a0f0f57905f0be', function (error, response, body) {
  console.log('body:', body); // Print the HTML for the Google homepage.
  res.render('movies/index')
  });
});

module.exports = router;
