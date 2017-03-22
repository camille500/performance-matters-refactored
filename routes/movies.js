/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const request = require('request');
const currencyFormatter = require('currency-formatter');
const randomNumber = require('random-number-in-range');

/* GET DATA FROM .EVN FILE
----------------------------------------- */
const URL = process.env.MOVIE_BASE_URL;
const KEY = process.env.MOVIE_API_KEY;

/* ROUTE FOR LISTS
----------------------------------------- */
router.get('/lists/:page', function(req, res) {
  const PAGE = req.params.page;
  request(`${URL}/movie/${PAGE}?${KEY}`, function (error, response, body) {
    res.locals.data = clean.lists(JSON.parse(body));
    res.render('movies/list');
  });
});

router.get('/lists/:id/similar', function(req, res) {
  const ID = req.params.id;
  request(`${URL}/movie/${ID}/similar?${KEY}`, function (error, response, body) {
    res.locals.data = clean.lists(JSON.parse(body));
    res.render('movies/list');
  });
});

/* ROUTE FOR DETAIL PAGE
----------------------------------------- */
router.get('/detail/:id', function(req, res) {
  const ID = req.params.id;
  request(`${URL}/movie/${ID}?${KEY}`, function (error, response, body) {
    res.locals.data = clean.detail(JSON.parse(body));
    res.render('movies/detail');
  });
});

/* ROUTE FOR RANDOM MOVIE
----------------------------------------- */
router.get('/special/random', function(req, res) {
  const ID = randomNumber(1, 99999);
  request(`${URL}/movie/${ID}?${KEY}`, function (error, response, body) {
    res.locals.data = clean.detail(JSON.parse(body));
    res.render('movies/detail');
  });
});

/* CLEAN THE DATA
----------------------------------------- */
const clean = {
  lists(data) {
    data.results.map(function(movie) {
      movie.backdrop_path = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    });
    return data;
  },
  detail(movie) {
    console.log(movie)
    movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movie.runtime = `${(movie.runtime / 60).toFixed()} uur`;
    movie.budget = currencyFormatter.format(movie.budget, { locale: 'nl-NL' });
    movie.revenue = currencyFormatter.format(movie.revenue, { locale: 'nl-NL' });
    movie.similar = `/movies/lists/${movie.id}/similar`
    return movie;
  }
}


module.exports = router;
