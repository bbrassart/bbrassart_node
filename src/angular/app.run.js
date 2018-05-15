angular.module('myAngular').run(['bsLoadingOverlayService',
  function(
    bsLoadingOverlayService
  ) {
    bsLoadingOverlayService.setGlobalConfig({
      templateUrl: 'bsLoadingOverlaySpinJs',
      activeClass: 'loading-content'
    });
  }
]);