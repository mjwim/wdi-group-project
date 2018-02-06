const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const trips = require('../controllers/trips');
const users = require('../controllers/users');

// Routes go here

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/trips')
  .get(trips.index)
  .post(secureRoute, trips.create);

router.route('/trips/:id')
  .get(trips.show)
  .put(secureRoute, trips.update)
  .delete(secureRoute, trips.delete);

router.route('/trips/:tripId/members')
  .post(secureRoute, trips.addMember);

router.route('/trips/:tripId/bills')
  .post(secureRoute, trips.addBill);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(users.delete);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
