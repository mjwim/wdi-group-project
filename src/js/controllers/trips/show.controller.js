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
      totalSpend();
      yourSpend();

      vm.currentUser = User.get({ id: $auth.getPayload().userId });
      vm.labels = vm.trip.members.map(member => member.username);
      vm.memberTotalBillAmounts = [];
      vm.allMemberIds = vm.trip.members.map(member => member.id);
      vm.yourBalance = yourBalance();
      calculateMembersTotalSpend();
    });

  vm.allUsers = User.query();

  function tripDelete() {
    vm.trip
      .$remove()
      .then(()=> $state.go('tripsIndex'));
  }

  function addMember() {
    Trip
      .addMember({ tripId: vm.trip.id}, { memberId: vm.memberId })
      .$promise
      .then((response)=> {
        vm.trip = response;
      });
  }

  function addBill() {
    Trip
      .addBill({ tripId: vm.trip.id }, vm.bill )
      .$promise
      .then((response)=> {
        vm.trip = response;

        const newBillAmount = parseInt(vm.bill.amount);

        const index = vm.labels.indexOf(vm.currentUser.username);
        vm.memberTotalBillAmounts[index] += newBillAmount;

        vm.totalSpend += newBillAmount;
        vm.yourSpend += newBillAmount;

        vm.yourBalance = yourBalance();
      });
  }

  function calculateMembersTotalSpend() {
    vm.trip.members.forEach(member => {
      const allMemberBills = vm.trip.bills.map(bill => {
        if(bill.createdBy.id === member.id) return bill.amount;
      }).filter(Number);

      const totalMemberSpend = (allMemberBills.length !== 0) ? allMemberBills.reduce((a, b) => a + b) : 0;

      vm.memberTotalBillAmounts.push(totalMemberSpend);
    });
  }

  function totalSpend() {
    const billsArray =  vm.trip.bills;
    vm.totalSpend =  billsArray.reduce((sum, bill) => {
      return sum + bill.amount;
    }, 0);
    return vm.totalSpend;
  }

  function yourSpend() {
    const billsArray =  vm.trip.bills;
    vm.yourSpend = billsArray.reduce((sum, bill) => {
      const amountToAdd = bill.createdBy.id === $auth.getPayload().userId ? bill.amount : 0;
      return sum + amountToAdd;
    }, 0);
    return vm.yourSpend;
  }

  function yourBalance() {
    return Math.floor(vm.yourSpend - vm.totalSpend/(vm.trip.members.length));
  }


  vm.delete = tripDelete;
  vm.addMember = addMember;
  vm.addBill = addBill;
}
