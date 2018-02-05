angular
  .module('tripsApp')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', 'TripBill', '$stateParams', '$state'];
function TripsShowCtrl(Trip, TripBill, $stateParams, $state) {
  const vm = this;
  vm.trip = Trip.get($state.params);
}
