
/**
 * Dependencies.
 */

var exec = require('child_process').exec;

/**
 * Login to a LinkedIn account.
 *
 * @param {String} email
 * @param {String} password
 */

var login = exports.login = function(email, password){
  return function(nightmare) {
    nightmare
      .viewport(800, 1600)
      .goto('https://www.linkedin.com/uas/login')
      .type('#session_key-login', email)
      .type('#session_password-login', password)
      .click('#btn-primary')
      .wait('#main-search-box');
  };
};

/**
 * Perform a search.
 *
 * @param {String} type
 * @param {String} query
 */

var search = exports.search = function(type, query) {
  if (!type || type.length === 0) type = 'all';
  type = type.toLowerCase();
  return function(nightmare) {
    nightmare
      .exists('#main-search-box', function(ready) {
        if (!ready) throw 'Search box not ready';
        return;
      })
      .type('#main-search-box', query)
      .click('.search-button')
      .wait('#search-types')
      .click('li > a[href*="' + type + '"]')
      .wait(1000);
  }
};

/**
 * Filter search results.
 *
 * @param {Array} filter, ['United States']
 */

var filter = exports.filter = function(filters) {
  return function(nightmare) {
    nightmare
      .exists('.search-results', function(ready) {
        if (!ready) throw 'Search results not ready';
        return;
      });
    filters.forEach(function(filter) {
      nightmare
        .click('label[title="' + filter + '"]')
        .wait(1000);
    });
  }
};

/**
 * Crawl X pages from search results.
 *
 * @param {Integer} pages leave blank for indefinite crawling.
 */

var crawl = exports.crawl = function(pages) {
  var pages = pages || 10;
  return function(nightmare) {
    for (var i = 0; i < pages; i++) {
      for (var j = 0; j < 10; j++) {
        nightmare
          .click('#results > li:nth-child(' + (j + 1) + ')')
          .wait(1000)
          .back();
      }
      nightmare
        .click('#results-pagination > ul > li.next > a')
        .wait(1000);
    }
  }
};

/**
 * Connect with user.
 *
 * WIP
 *
 * @param {String} user username or URL or nightmare is already on user page
 */

var connect = exports.connect = function(user) {
  return function(nightmare) {
    nightmare
      .exists('.button-primary', function(ready) {
        if (!read) throw 'Connect button not ready';
        return;
      })
      .click('.button-primary')
      .wait('.btn-primary')
      // Need to select how to i know this person OR fill in an email address
      .click('.btn-primary')
      .wait(1000);
  }
};

/**
 * Get an array of users who has viewed me.
 *
 *
 */

var viewedMe = exports.viewedMe = function() {
  return function(nightmare) {
    // WIP
  }
};
