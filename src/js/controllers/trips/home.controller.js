angular
  .module('tripsApp')
  .controller('TripsHomeCtrl', TripsHomeCtrl);

TripsHomeCtrl.$inject = ['Trip'];
function TripsHomeCtrl(Trip) {
  const vm = this;
  vm.all = Trip.query();
}
