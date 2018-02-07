angular
  .module('tripsApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
    scope: {
      center: '=',
      message: '='
    },
    link(scope, element) {
      scope.$watch('center', () => {
        if (!scope.center.lat || !scope.center.lng) return false;
        const map = new $window.google.maps.Map(element[0], {
          zoom: 4,
          center: scope.center
        });
        const infoWindow = new $window.google.maps.InfoWindow({
          content: `<h1>${scope.message}</h1>`
        });
        const marker = new $window.google.maps.Marker({
          position: scope.center,
          map: map
        });
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  };
}
