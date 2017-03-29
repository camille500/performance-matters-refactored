# Moviespot - Server-side edition

This is the documentation belonging to the server-side edition of the SPA i've made for Web app from scratch.

## Live server-side version

I've deployed my server-side application on Heroku.
[https://moviespot-pm.herokuapp.com/](https://moviespot-pm.herokuapp.com/)

## Installation

Please follow these steps to install the application.

#### Clone the repository

```
$ git clone https://github.com/camille500/performance-matters-refactored.git
```

#### Install dependencies
1. Navigate to the folder containing the cloned repository using ```$ cd ``` in your terminal.
2. Install all NPM packages by typing ```$ npm install``` in your terminal.
3. Wait till all packages are installed and continue to the next step.

#### Start the server
1. Make sure that port `3000` is free to use.
2. Type ```$ npm start``` in your terminal in the folder where you just installed all packages.
3. Wait till you see the ```Server started on port 3000``` logged in the terminal.
4. [Open the application](http://localhost:3000/)

#### Test online using ngrok
1. Open a new tab in your terminal after starting up the server.
2. Type ```$ npm expose``` to expose the application to the web.
3. Copy the url starting with `https://` to open the application.

## Audits

I've done multiple audits to see the effects of the performance on the application. Here are the screenshots with explanations of what i've changed. All is tested without throttling.

#### SPA

These are the audits I've done on the SPA (not this edition, but the none server-side one).

![Audit](/screenshots/1.png "Audit")
![Audit](/screenshots/2.png "Audit")

As you can see, the score isn't that high. The application wasn't usable when JavaScript was disabled and without images the app didn't look good. All that is now much better.

#### Server-side without improved performance

The next screenshots were made after refactoring the SPA to a server-side application.

![Audit](/screenshots/3.png "Audit")
![Audit](/screenshots/4.png "Audit")

The Page Speed audit was already higher. The application is also working without JavaScript now. There is a lot to improve though. A load time of 4.94s is really high.

#### Server-side with improved performance

I've worked on the performance of the application. These are the steps i've taken:

- Added GZIP compression
- Enabled caching
- Added a service worker so that the site works offline
- Added node localStorage for storing API data, so that the server doesn't have to do a new call when opening a page for the second time
- Fontfaceobserver to prevent FOIT
- Minified CSS
- Browserify with babelify for compiling and minifying the JS
- Non blocking JS by adding the ```defer``` tag
- Loading smaller images from the IMDB site

The result was awesome, the site now loads in about .704 ms. In total like 7x faster than before. The website now also works offline (if cached), with JS disabled and without images.

![Audit](/screenshots/5.png "Audit")
![Audit](/screenshots/6.png "Audit")
![Audit](/screenshots/7.png "Audit")

## About MovieSpot
MovieSpot is a Single Page movie database. It's possible to check out the latest-, upcoming-, top rated-, trending movies & much more. Want more movies like youre favorite movie? Just search for the movie & see what movies are similar to that one.

### Features

- Get a list of the most popular movies, the latest movies, upcoming movies and trending movies.
- Get detailled information about every movie, including a short overview, poster image, budget & revenue, language and a lot more.
- Get a list of similar movies for each movie on MovieSpot.
- Search for movies in the Movie Database, and get direct results.
- Unlimited random movies, just push the menu-item and get a new random movie everytime.

### Usage

- Open the application and you'll see the movies that are actually trending.
- Click on the menu items to see other lists (like, upcoming & newest movies). The list now automatically adapts to your choice.
- Want to search for a movie? Click on the magnifiying glass to open the search form.
- Want to see a random movie? Click on the 'random' button in the menu!
- Want to see similar movies? Click on an movie and get a list of similar ones!


### Wishlist
- Search movies based on genres
- Rate movies from this Application -> Post to TheMovieDB
- Include trailers from other API
- Include more filter options
- Optimizations for better performance
- Improve accessibility

### Sources
- https://github.com/leonidas/transparency
- http://projects.jga.me/routie/
- http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
- http://stackoverflow.com/questions/413439/how-to-dynamically-change-a-web-pages-title
- http://stackoverflow.com/questions/42386509/object-properties-are-undefined-the-object-itself-shows-all-the-data-though
- https://www.themoviedb.org/
- https://developers.themoviedb.org/3
- https://www.gosquared.com/resources/flag-icons/
