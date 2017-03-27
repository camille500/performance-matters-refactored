/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');
const request = require('request');
const compression = require('compression')

const app = express();

require('dotenv').config();
app.use(compression())

/* LOAD ALL ROUTERS
----------------------------------------- */
const moviesRouter = require('./routes/movies');

/* MIDDLEWARE FOR THE VIEW ENGINE
----------------------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* INITIALIZE ROUTES
----------------------------------------- */
app.use(express.static('public')); // For server static files
app.use('/movies', moviesRouter);

/* INDEX PAGE
----------------------------------------- */
app.get('/', function(req, res) {
  res.redirect('/movies/lists/popular')
});

app.get('/offline', function(req, res) {
  res.redirect('/index.ejs')
});

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors');
app.use(function(req, res, next) {
   res.render('404');
});

/* START THE NPM SERVER
----------------------------------------- */
app.listen(3000, function() {
    console.log('De server is opgestart');
});
