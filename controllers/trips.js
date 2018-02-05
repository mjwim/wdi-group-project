const Trip = require('../models/trip');

function indexRoute(req, res, next) {
  Trip
    .find()
    .populate('createdBy')
    .exec()
    .then((trips) => res.json(trips))
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


function createRoute(req, res, next) {
  Trip
    .create(req.body)
    .then(trip => res.status(201).json(trip))
    .catch(next);
}

// function updateRoute(req, res, next) {
//   Trip
//     .findById(req.params.body)
//     .exec()
// }




module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
  // update: updateRoute
};
