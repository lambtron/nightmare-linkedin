
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
      .wait(5000);
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
  return function(nightmare) {
    // WIP
  }
};
