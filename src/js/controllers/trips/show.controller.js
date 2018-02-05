angular
  .module('tripsApp')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', '$stateParams', '$state'];
function TripsShowCtrl(Trip, $stateParams, $state) {
  const vm = this;
  vm.trip = Trip.get($state.params);

  function tripDelete() {
    vm.trip
      .$remove()
      .then(()=> $state.go('tripsIndex'));
  }

  function addMember() {
    vm.trip
      .$addMember();
  }

  function addBill() {
    vm.trip
      .$addBill();
  }

  vm.delete = tripDelete;
  vm.addMember = addMember;
  vm.addBill = addBill;
}
