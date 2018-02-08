angular
  .module('tripsApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl);

TripsIndexCtrl.$inject = ['Trip', 'filterFilter', '$scope'];
function TripsIndexCtrl(Trip, filterFilter, $scope) {
  const vm = this;

  vm.all = Trip.query();



  function filterTrips() {
  // paramteres which you're filtering by
    const params = { location: {name: vm.searchBoxValue}};
    // first argument what you are filtering
    // second is what you're filtering with
    vm.searchBoxValue ? vm.filtered = filterFilter(vm.all, params) : vm.filtered = vm.all;
  }

  filterTrips();

  $scope.$watchGroup([
    () => vm.searchBoxValue
  ], filterTrips);
}
