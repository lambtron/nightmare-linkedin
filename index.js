
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var request = require('superagent');
var fs = require('fs');

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
      .wait(5000);
  };
};

/**
 * Perform a search.
 *
 * @param {String} query
 */

var search = exports.search = function(query) {
  return function(nightmare) {
    nightmare
      .exists('#main-search-box', function(ready) {
        if (!ready) throw 'Search box not ready';
        return;
      })
      .type('#main-search-box', query)
      .click('.search-button')
      .wait('.search-results');
  }
}

/**
 * Filter search results.
 *
 * @param {Array} filter, ['United States']
 */

var filter = exports.filter = function(filter) {
  return function(nightmare) {
    // Assume already on search results page.
    nightmare
      .exists('.search-results', function(ready) {
        if (!ready) return;
      });
  }
}

/**
 * Crawl X pages from search results.
 *
 * @param {Integer} pages leave blank for indefinite crawling.
 */

var crawl = exports.crawl = function(pages) {
  return function(nightmare) {
    // Assume already on search results page.
    var links = [];
    nightmare
      .exists('.search-results', function(ready) {
        if (!ready) return;
      })
      .evaluate(function() {
        return document.querySelectorAll('a.title');
      }, function(res) {
        links = res;
      });

    for (var i = 0; i < links.length; i++) {
      nightmare
        .click(links[i])
        .wait(5000)
        .back();
    };
  }
}
