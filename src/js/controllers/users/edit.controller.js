angular
  .module('tripsApp')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', '$state', '$scope', '$rootScope'];
function UsersEditCtrl(User, $state, $scope, $rootScope) {
  const vm = this;

  vm.user = User.get($state.params);
  vm.update = update;

  function update() {
    User
      .update($state.params, vm.user)
      .$promise
      .then(() => $state.go('usersIndex'));
  }

  $rootScope.$on('uploadedImage', (e, data) => {
    vm.user.image = data.file.url;
    $scope.$apply();
  });
}
