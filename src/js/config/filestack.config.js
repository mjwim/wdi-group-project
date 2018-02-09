angular
  .module('tripsApp')
  .config(Filestack);

Filestack.$inject = ['filepickerProvider'];
function Filestack(filepickerProvider) {
  filepickerProvider.setKey('AhhjHaFSFSCeSZT7gPRd1z');
}
