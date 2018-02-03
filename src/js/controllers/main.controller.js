angular
  .module('tripsApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$transitions'];
function MainCtrl($rootScope, $state, $auth, $transitions) {
  const vm = this;
  vm.navIsOpen = false;
  vm.isAuthenticated = $auth.isAuthenticated;
  const protectedStates = ['tripsNew'];

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    vm.navIsOpen = false;
    vm.pageName = transition.$to().name;

    if(!$auth.isAuthenticated() && protectedStates.includes(vm.pageName)) {
      vm.message = 'You must be logged in to view this page.';
      return $state.go('login');
    }

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
