angular
  .module('tripsApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as vm'
    })
    .state('tripsNew', {
      url: '/trips/new/:id',
      templateUrl: 'js/views/trips/new.html',
      controller: 'TripsNewCtrl as vm'
    })
    .state('tripsIndex', {
      url: '/trips/index',
      templateUrl: 'js/views/trips/index.html',
      controller: 'TripsIndexCtrl as vm'
    })
    .state('tripsEdit', {
      url: '/trips/edit/:id',
      templateUrl: 'js/views/trips/edit.html',
      controller: 'TripsEditCtrl as vm'
    })
    .state('tripsShow', {
      url: '/trips/show/:id',
      templateUrl: 'js/views/trips/show.html',
      controller: 'TripsShowCtrl as vm'
    });


}
