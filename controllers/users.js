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

function usersUpdate(req, res, next) {
  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(user => {
      if (!user) return res.notFound();
      return res.status(200).json(user);
    })
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.status(204).end();
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: usersUpdate,
  delete: usersDelete
};
