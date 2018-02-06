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
    Trip
      .addMember({ tripId: vm.trip.id}, {memberId: vm.memberId });
  }

  function addBill() {
    console.log(vm.trip);
    Trip
      .addBill({ tripId: vm.trip.id }, vm.bill );
  }

  vm.delete = tripDelete;
  vm.addMember = addMember;
  vm.addBill = addBill;
}
