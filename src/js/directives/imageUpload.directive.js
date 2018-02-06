angular
  .module('fileStackApp')
  .directive('imageUpload', imageUpload);

imageUpload.$inject = ['filepickerService'];
function imageUpload(filepickerService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, model) => {
      element.bind('click', (e) => {
        e.preventDefault();

        filepickerService
          .pick({ mimeType: 'image/*' }, data => {
            model.$setViewValue(data.url);
          });
      });
    }
  };
}
