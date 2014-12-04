var Nightmare = require('nightmare');
var LinkedIn = require('../index.js');
var should = require('should');
var after = require('after');

describe('Nightmare-LinkedIn', function () {
  this.timeout(40000);

  /**
   * Navigation
   */

  describe('navigation', function () {

    it('should login to LinkedIn', function (done) {
      var email = '';
      var password = '';
      new Nightmare()
        .use(LinkedIn.login(email, password)
        .run(done);
    });
  });
});