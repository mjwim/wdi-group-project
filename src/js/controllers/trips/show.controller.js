angular
  .module('tripsApp')
  .controller('TripsShowCtrl', TripsShowCtrl);

TripsShowCtrl.$inject = ['Trip', 'User', '$stateParams', '$state', '$auth'];
function TripsShowCtrl(Trip, User, $stateParams, $state, $auth) {
  const vm = this;
  vm.trip = Trip.get($state.params);

  Trip
    .get($stateParams)
    .$promise
    .then(res => {
      vm.trip = res;
    })
    .then(() => {
      vm.totalSpend = totalSpend();
      vm.yourSpend = yourSpend();
      vm.yourBalance = yourBalance();
    });

  vm.allUsers = User.query();

  function tripDelete() {
    vm.trip
      .$remove()
      .then(()=> $state.go('tripsIndex'));
  }

  function addMember() {
    Trip
      .addMember({ tripId: vm.trip.id}, { memberId: vm.memberId });
  }

  function addBill() {
    Trip
      .addBill({ tripId: vm.trip.id }, vm.bill );
  }

  function totalSpend() {
    const billsArray =  vm.trip.bills;
    return billsArray.reduce((sum, bill) => {
      return sum + bill.amount;
    }, 0);
  }

  function yourSpend() {
    const billsArray =  vm.trip.bills;
    return billsArray.reduce((sum, bill) => {
      const amountToAdd = bill.createdBy.id === $auth.getPayload().userId ? bill.amount : 0;
      return sum + amountToAdd;
    }, 0);
  }

  function yourBalance() {
    return (totalSpend() - yourSpend());
  }

  vm.delete = tripDelete;
  vm.addMember = addMember;
  vm.addBill = addBill;

}
