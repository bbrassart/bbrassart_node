var dependencies = [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'bsLoadingOverlay',
    'bsLoadingOverlaySpinJs'
];

var app = angular.module('myAngular', dependencies);

app.run(['bsLoadingOverlayService', function(bsLoadingOverlayService) {
    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'bsLoadingOverlaySpinJs',
        activeClass: 'loading-content'
    });
}]);