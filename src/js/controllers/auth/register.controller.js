angular
  .module('tripsApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    vm.user.image = 'https://a3-images.myspacecdn.com/images03/1/240e42b5d9ce48a78983961e7fcb3c39/600x600.jpg';

    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.submit = submit;
}
