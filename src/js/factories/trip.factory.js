angular
  .module('tripsApp')
  .factory('Trip', Trip);

Trip.$inject = ['$resource'];
function Trip($resource) {
  return new $resource('/api/trips/:id', { id: '@id' }, {
    update: { method: 'PUT' },
    addBill: { method: 'POST', url: '/api/trips/:tripId/bills' },
    addMember: { method: 'POST', url: '/api/trips/:tripId/members' }
  });
}

// TripBill.$inject = ['$resource'];
// function TripBill($resource) {
//   return new $resource('/api/trips/:tripId/bills/:id', { id: '@id' }, {
//     update: { method: 'PUT' }
//   });
// }
