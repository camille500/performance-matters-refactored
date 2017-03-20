const express = require('express');
const router = express.Router();
const request = require('request');

const URL = process.env.MOVIE_BASE_URL;
const KEY = process.env.MOVIE_API_KEY;

router.get('/trending', function(req, res) {
  request(`${URL}/movie/popular?${KEY}`, function (error, response, body) {
  res.locals.data = cleanData(JSON.parse(body));
  res.render('movies/index')
  });
});

router.get('/toplist', function(req, res) {
  request(`${URL}/movie/top_rated?${KEY}`, function (error, response, body) {
  res.locals.data = cleanData(JSON.parse(body));
  res.render('movies/index')
  });
});

router.get('/latest', function(req, res) {
  request(`${URL}/movie/now_playing?${KEY}`, function (error, response, body) {
  res.locals.data = cleanData(JSON.parse(body));
  res.render('movies/index')
  });
});

router.get('/upcoming', function(req, res) {
  request(`${URL}/movie/upcoming?${KEY}`, function (error, response, body) {
  res.locals.data = cleanData(JSON.parse(body));
  res.render('movies/index')
  });
});

const cleanData = (data) => {
  data.results.map(function(movie) {
    movie.backdrop_path = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
  });
  return data;
}

module.exports = router;
