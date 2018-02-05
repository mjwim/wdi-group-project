angular
  .module('tripsApp')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  return new $resource('/api/user/:id', { id: '@id'});
}
