angular
  .module('tripsApp')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', 'User', '$stateParams', '$state'];
function TripsShowCtrl(Trip, User, $stateParams, $state) {
  const vm = this;
  vm.trip = Trip.get($state.params);
  vm.allUsers = User.query();

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
    Trip
      .addBill({ tripId: vm.trip.id }, vm.bill );
  }

  vm.delete = tripDelete;
  vm.addMember = addMember;
  vm.addBill = addBill;
}
