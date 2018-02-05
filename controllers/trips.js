const Trip = require('../models/trip');

function indexRoute(req, res, next) {
  Trip
    .find()
    .populate('createdBy')
    .exec()
    .then((posts) => res.json(posts))
    .catch(next);
}

function showRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      res.json(trip);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
