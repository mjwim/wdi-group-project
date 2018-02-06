angular
  .module('tripsApp')
  .config(Filestack);

Filestack.$inject = ['filepickerProvider'];
function Filestack(filepickerProvider) {
  filepickerProvider.setKey('AybK9jSwRvi93ESrCzM0wz');
}
