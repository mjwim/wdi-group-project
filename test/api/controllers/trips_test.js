/* globals api, expect, it, describe, afterEach, beforeEach */

require('../../spec_helper');

const Trip = require('../../../models/trip');
const User = require('../../../models/user');

describe('Trips Controller Test', () => {
  afterEach(done => {
    Trip.collection.drop();
    User.collection.drop();
    done();
  });

  //Index Route

  describe('GET /api/trips', () => {
    beforeEach(done => {
      User
        .create({
          username: 'tripTester',
          email: 'tripTester@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .then(user => {
          Trip
            .create({
              location: {
                name: 'Dublin',
                lat: 6.2603,
                lng: 53.3498
              },
              image: '',
              createdBy: user,
              bills: [],
              members: []
            })
            .then(() => done())
            .catch(done);
        });
    });

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

    it('should return an array of trip objects with specific properties', done => {
      api
        .get('/api/trips')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '_id',
              'id',
              '__v',
              'location',
              'createdBy',
              'bills',
              'image',
              'members'
            ]);
          done();
        });
    });
  });
  // POST ROUTE
  describe('POST /api/trips', () => {

    let user  = null;
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'tripTester2',
          email: 'tripTester2@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          user = res.body.user;
          done();
        });
    });

    it('should return a 201 response', done => {
      api
        .post('/api/trips')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          location: {
            name: 'Dublin',
            lat: 6.2603,
            lng: 53.3498
          },
          image: '',
          createdBy: user,
          bills: [],
          members: []
        })
        .expect(201, done);
    });

    it('should return created trip data in response body', done => {
      api
        .post('/api/trips')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          location: {
            name: 'Dublin',
            lat: 6.2603,
            lng: 53.3498
          },
          image: '',
          createdBy: user,
          bills: [],
          members: []
        })
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys([
              '_id',
              'id',
              '__v',
              'location',
              'createdBy',
              'bills',
              'image',
              'members'
            ]);
          done();
        });
    });
  });
  // SHOW ROUTE
  describe('GET /api/trips/:id', () => {

    let testTrip = null;
    let user  = null;
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'tripTester2',
          email: 'tripTester2@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          user = res.body.user;
          done();
        });
    });

    beforeEach(done => {
      Trip.create({
        location: {
          name: 'Dublin',
          lat: 6.2603,
          lng: 53.3498
        },
        image: '',
        createdBy: user,
        bills: [],
        members: []
      })
        .then(tripData => {
          testTrip = tripData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get(`/api/trips/${testTrip.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return trip data in response body', done => {
      api
        .get(`/api/trips/${testTrip.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys([
              '_id',
              'id',
              '__v',
              'location',
              'createdBy',
              'bills',
              'image',
              'members'
            ]);

          done();
        });
    });
  });

  // UPDATE ROUTE
  describe('PUT /api/trips/:id', () => {
    let testTrip = null;
    let user  = null;
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'tripTester2',
          email: 'tripTester2@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          user = res.body.user;
          done();
        });
    });

    beforeEach(done => {
      Trip.create({
        location: {
          name: 'Dublin',
          lat: 6.2603,
          lng: 53.3498
        },
        image: '',
        createdBy: user,
        bills: [],
        members: []
      })
        .then(tripData => {
          testTrip = tripData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .put(`/api/trips/${testTrip.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          location: {
            name: 'Dublin',
            lat: 6.2603,
            lng: 53.3498
          },
          image: '',
          // createdBy: {},
          bills: [],
          members: []
        })
        .expect(200, done);
    });

    it('should return updated trip data in response body', done => {
      api
        .put(`/api/trips/${testTrip.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          location: {
            name: 'Belfast',
            lat: 6.2603,
            lng: 53.3498
          },
          image: '',
          createdBy: user,
          bills: [],
          members: []
        })
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.to.have.property('image', '');
          done();
        });
    });
  });

  // DELETE ROUTE
  describe('DELETE /api/trips/:id', () => {

    let testTrip = null;
    let user  = null;
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'tripTester2',
          email: 'tripTester2@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          token = res.body.token;
          user = res.body.user;
          done();
        });
    });

    beforeEach(done => {
      Trip.create({
        location: {
          name: 'Dublin',
          lat: 6.2603,
          lng: 53.3498
        },
        image: '',
        createdBy: user,
        bills: [],
        members: []
      })
        .then(tripData => {
          testTrip = tripData;
          done();
        })
        .catch(done);
    });

    beforeEach(done => {
      Trip.create({
        location: {
          name: 'Dublin',
          lat: 6.2603,
          lng: 53.3498
        },
        image: '',
        createdBy: user,
        bills: [],
        members: []
      })
        .then(tripData => {
          testTrip = tripData;
          done();
        })
        .catch(done);
    });

    it('should return a 204 response', done => {
      api
        .delete(`/api/trips/${testTrip.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(204, done);
    });
  });
});
