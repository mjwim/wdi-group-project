const Trip = require('../models/trip');
const User = require('../models/user');

function homeRoute(req, res, next) {
  Trip
    .find()
    .populate('createdBy')
    .exec()
    .then((trips) => res.json(trips))
    .catch(next);
}

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
    .populate('createdBy members bills.createdBy')
    .exec()
    .then((trip) => {
      if(!trip) return res.notFound();

      res.json(trip);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user.id;

  Trip
    .create(req.body)
    .then((trip) => {
      console.log(trip);
      trip.members.push(req.user.id);
      return trip.save();
    })
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
    .populate('createdBy members bills.createdBy')
    .exec()
    .then((trip) => {
      if (!trip) return res.notFound();

      return User.findById(req.body.memberId)
        .then((user) => trip.members.push(user))
        .then(() => trip.save());
    })
    .then(trip => trip.populate('createdBy members bills.createdBy'))
    .then(trip => res.status(200).json(trip))
    .catch(next);
}

function addBillRoute(req, res, next) {
  req.body.createdBy = req.user;
  Trip
    .findById(req.params.tripId)
    .populate('createdBy members bills.createdBy')
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
  home: homeRoute,
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  addMember: addMemberRoute,
  addBill: addBillRoute
};
