
/**
 * Dependencies.
 */

var Nightmare = require('nightmare');
var LinkedIn = require('nightmare-linkedin');
var nightmare = new Nightmare();

/**
 * Set variables.
 */

var email = '';
var password = '';
var type = 'people';
var query = 'product manager';
var filter = ['United States'];
var pages = 2;

/**
 * Set nightmare commands.
 */

nightmare

  // Login to LinkedIn.
  .use(LinkedIn.login(email, password))

  // Search for something and set the types of results.
  .use(LinkedIn.search(type, query))

  // Filter the search results for 'United States'.
  .use(LinkedIn.filter(filter))

  // Crawl results for two pages.
  .use(LinkedIn.crawl(pages))

  // Execute commands.
  .run(done);