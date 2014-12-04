var Nightmare = require('nightmare');
var LinkedIn = require('../index.js');
var should = require('should');
var after = require('after');

describe('Nightmare-LinkedIn', function() {
  this.timeout(40000);

  /**
   * Navigation
   */

  var email = 'andyjiang+@gmail.com';
  var password = 'nightmarelinkedin';
  var results = 'https://www.linkedin.com/vsearch/f?orig=TRNV&rsid=282041601417333429963&trk=vsrp_all_sel&trkInfo=VSRPsearchId%3A282041601417333429963%2CVSRPcmpt%3Atrans_nav';

  it('should login to LinkedIn', function(done) {
    new Nightmare()
      .use(LinkedIn.login(email, password))
      .run(done);
  });

  it('should search LinkedIn', function(done) {
    var type = 'people';
    var query = 'product manager';
    new Nightmare()
      .use(LinkedIn.login(email, password))
      .use(LinkedIn.search(type, query))
      .run(done);
  });

  it('should filter LinkedIn search results', function(done) {
    var filter = ['United States', 'United Kingdom'];
    new Nightmare()
      .use(LinkedIn.login(email, password))
      .goto(results)
      .use(LinkedIn.filter(filter))
      .run(done);
  });

  it('should crawl LinkedIn search results', function(done) {
    var pages = 2;
    new Nightmare()
      .use(LinkedIn.login(email, password))
      .goto(results)
      .use(LinkedIn.crawl(pages))
      .run(done);
  });
});