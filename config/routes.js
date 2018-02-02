const express = require('express');
const router  = express.Router();
const auth = require('../controllers/auth');

// Routes go here

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
