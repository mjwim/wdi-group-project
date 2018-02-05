// .state('tripsNew', {
//   url: '/trips/new/:id',
//   templateUrl: 'js/views/trips/new.html',
//   controller: 'TripsNewCtrl as vm'
// });

angular
  .module('tripsApp')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip'];
function TripsNewCtrl(Trip) {
  const vm = this;

}
