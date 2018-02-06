angular
  .module('tripsApp')
  .directive('googleAutocomplete', googleAutocomplete);

googleAutocomplete.$inject = ['$window'];
function googleAutocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: []
      };

      scope.input = new $window.google.maps.places.Autocomplete(element[0],
        options);

      $window.google.maps.event.addListener(scope.input, 'place_changed',
        function() {
          const locationData = scope.input.getPlace();

          const location = {
            name: locationData.name,
            lat: locationData.geometry.location.lat(),
            lng: locationData.geometry.location.lng()
          };

          scope.$apply(function() {
            model.$setViewValue(location);
          });
        });
    }
  };
}
