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
  .get(trips.index)
  .post(secureRoute, trips.create);

router.route('/trips/:id')
  .get(trips.show)
  .put(secureRoute, trips.update);



router.all('/*', (req, res) => res.notFound());

module.exports = router;
