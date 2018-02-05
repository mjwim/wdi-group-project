const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const trips = require('../controllers/trips');

// Routes go here

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/trips')
  .get(trips.index);

router.route('/trips/:id')
  .get(trips.show);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
