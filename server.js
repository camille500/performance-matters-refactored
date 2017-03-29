/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');
const request = require('request');
const compression = require('compression')

const app = express();

require('dotenv').config();

/* SET PORT FOR HEROKU
----------------------------------------- */
var port = process.env.PORT || 3000;

/* ENABLE CACHE AND COMPRESSION
----------------------------------------- */
app.set('view cache', true);
app.use(compression());

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
  res.redirect('/movies/lists/popular');
});

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors');
app.use(function(req, res, next) {
   res.render('404');
});

/* START THE NPM SERVER
----------------------------------------- */
app.listen(port, function() {
    console.log('Server started on port 3000');
});
