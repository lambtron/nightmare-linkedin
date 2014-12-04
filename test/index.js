var Nightmare = require('nightmare');
var LinkedIn = require('../index.js');
var should = require('should');
var after = require('after');

describe('Nightmare-LinkedIn', function() {
  this.timeout(40000);

  /**
   * Navigation
   */

  describe('navigation', function() {
    var email = '';
    var password = '';

    it('should login to LinkedIn', function(done) {
      new Nightmare()
        .use(LinkedIn.login(email, password))
        .run(done);
    });

    it('should search LinkedIn', function(done) {
      var type = '';
      var query = '';
      new Nightmare()
        .use(LinkedIn.login(email, password))
        .use(LinkedIn.search(type, query))
        .run(done);
    });

    it('should filter LinkedIn search results', function(done) {
      var filter = [];
      var results = '';
      new Nightmare()
        .use(LinkedIn.login(email, password))
        .goto(results)
        .use(LinkedIn.filter(filter))
        .run(done);
    });

    it('should crawl LinkedIn search results', function(done) {
      var pages = 2;
      var results = '';
      new Nightmare()
        .use(LinkedIn.login(email, password))
        .goto(results)
        .use(LinkedIn.crawl(pages))
        .run(done);
    });

  });
});