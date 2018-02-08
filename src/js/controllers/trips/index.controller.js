angular
  .module('tripsApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip', 'filterFilter'];
function TripsIndexCtrl(Trip, filterFilter) {
  const vm = this;
  vm.all = Trip.query();

  function filterTrips() {
  // paramteres which you're filtering by
    const params = { name: vm.searchBoxValue };
    // first argument what you are filtering
    // second is what you're filtering with
    vm.filtered = filterFilter(vm.all, params);
  }

  filterTrips();
}
