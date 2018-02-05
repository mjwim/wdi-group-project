// .state('tripsNew', {
//   url: '/trips/new/:id',
//   templateUrl: 'js/views/trips/new.html',
//   controller: 'TripsNewCtrl as vm'
// });

angular
  .module('tripsApp')
  .controller('TripsNewCtrl', TripsNewCtrl);

TripsNewCtrl.$inject = ['Trip', '$state'];
function TripsNewCtrl(Trip, $state) {
  const vm = this;

  vm.trip = {};

  function tripCreate() {
    if(vm.newForm.$valid) {
      Trip
        .save(vm.trip)
        .$promise
        .then(() => $state.go('tripsIndex'));
    }
  }

  vm.create = tripCreate;
}
