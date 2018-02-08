angular
  .module('tripsApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$state'];
function UsersShowCtrl(User, $state) {
  const vm = this;
  vm.user = User.get($state.params);

  vm.deleteUser = deleteUser;

  function deleteUser() {
    vm.user
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }
}
