/* globals api, expect, it, describe, afterEach, beforeEach */

require('../../spec_helper');

const Trip = require('../../../models/trip');

describe('Trips Controller Test', () => {
  describe('GET /api/trips', () => {
    it('should return a 200 response', done => {
      api
        .get('/api/trips')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
    it('should return an array of trips', function(done) {
      api
        .get('/api/trips')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
