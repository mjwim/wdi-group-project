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

function updateRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then(trip => {
      if(!trip) return res.notFound();

      Object.assign(trip, req.body);
      return trip.save();
    })
    .then((trip) => res.json(trip))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if(!trip) res.notFound();
      return trip.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function addMemberRoute(req, res, next) {
  Trip
    .findById(req.params.tripId)
    .exec()
    .then((trip) => {
      if (!trip) return res.notFound();

      trip.members.push(req.body.memberId);

      return trip.save();
    })
    .then((trip) => res.json(trip))
    .catch(next);
}

function addBillRoute(req, res, next) {
  req.body.createdBy = req.user.id;
  Trip
    .findById(req.params.tripId)
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      trip.bills.push(req.body);
      return trip.save();
    })
    .then((bill) => res.json(bill))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  addMember: addMemberRoute,
  addBill: addBillRoute
};
