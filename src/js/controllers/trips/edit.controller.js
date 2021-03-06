angular
  .module('tripsApp')
  .controller('TripsEditCtrl', TripsEditCtrl);

TripsEditCtrl.$inject = ['Trip', '$state'];
function TripsEditCtrl(Trip, $state) {
  const vm = this;
  vm.all = Trip.query();

  vm.trip = Trip.get($state.params);
  vm.update = update;

  function update() {
    if(vm.editForm.$valid) {
      Trip
        .update({ id: $state.params.id }, vm.trip)
        .$promise
        .then(() => $state.go('tripsIndex'));
    }
  }

}
