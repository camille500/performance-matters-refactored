const express = require('express');
const router = express.Router();
const request = require('request');

const URL = process.env.MOVIE_BASE_URL;
const KEY = process.env.MOVIE_API_KEY;

router.get('/:page', function(req, res) {
  const PAGE = req.params.page;
  request(`${URL}/movie/${PAGE}?${KEY}`, function (error, response, body) {
    res.locals.data = cleanData(JSON.parse(body));
    res.render('movies/list');
  });
});

router.get('/detail/:id', function(req, res) {
  const ID = req.params.id;
  console.log(ID);
  res.render('movies/detail')
});

const cleanData = (data) => {
  data.results.map(function(movie) {
    movie.backdrop_path = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
  });
  return data;
}

module.exports = router;
