angular
  .module('tripsApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    vm.user.image = 'http://www.fillmurray.com/300/300';

    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.submit = submit;
}
