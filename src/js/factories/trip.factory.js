angular
  .module('tripsApp')
  .factory('Trip', Trip)
  .factory('TripBill', TripBill);

Trip.$inject = ['$resource'];
function Trip($resource) {
  return new $resource('/api/trips/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

TripBill.$inject = ['$resource'];
function TripBill($resource) {
  return new $resource('/api/trips/:tripId/bills/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
