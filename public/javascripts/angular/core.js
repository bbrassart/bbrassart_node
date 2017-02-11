//var app = angular.module('myAngular',[
//    'templates', 'ngAnimate', 'ngResource', 'ngSanitize', 'bsLoadingOverlay', 'bsLoadingOverlaySpinJs'
//]).run(['bsLoadingOverlayService', function(bsLoadingOverlayService) {
//    bsLoadingOverlayService.setGlobalConfig({
//        templateUrl: 'bsLoadingOverlaySpinJs',
//        activeClass: 'loading-content'
//    });
//}]);

var app = angular.module('myAngular', []);
app.controller('mainController', ['$scope', function($scope) {
    $scope.test = 'Yeppa';
}]);