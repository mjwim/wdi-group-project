const Trip = require('../models/trip');

function indexRoute(req, res, next) {
  Trip
    .find()
    .populate('createdBy')
    .exec()
    .then((posts) => res.json(posts))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
