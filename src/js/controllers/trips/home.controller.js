angular
  .module('tripsApp')
  .controller('TripsHomeCtrl', TripsHomeCtrl);

TripsHomeCtrl.$inject = ['Trip', 'filterFilter'];
function TripsHomeCtrl(Trip, filterFilter) {
  const vm = this;
  vm.all = Trip.query();

  // filtering
  function filterTrips() {
    vm.filtered = filterFilter(vm.all, vm.q);
  }

  filterTrips();
}
