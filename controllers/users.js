const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .populate('trips')
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('trips')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      res.json(user);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
