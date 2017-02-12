angular.module('myAngular')
.directive('cvscreen', ['mainService','bsLoadingOverlayService', '$timeout', '$window',
    function(mainService, bsLoadingOverlayService, $timeout, $window) {

        var ctrl = function() {
            var self = this;
            self.isShowing = false;
            self.experiences = [];
            self.tagColors = ["design", "pure", "js", "yui"];

            self.showCv = function(id) {
                bsLoadingOverlayService.start({
                    referenceId: 'header-cv-loading'
                });
                mainService.getExperiences({id: id})
                    .$promise.then(
                    function(response) {
                        self.experiences = response[0].experiences;
                        $timeout(
                            function() {
                                self.isShowing = true;
                                bsLoadingOverlayService.stop({
                                    referenceId: 'header-cv-loading'
                                });
                            }
                            , 200
                        );
                    },
                    function(err) {
                        self.error = err;
                        self.isShowing = false;
                        bsLoadingOverlayService.stop({
                            referenceId: 'header-cv-loading'
                        });
                    }
                );
            };

            self.refreshCv = function(id) {
                bsLoadingOverlayService.start({
                    referenceId: 'body-cv-loading'
                });
                mainService.getExperiences({id: id})
                    .$promise.then(
                    function(response) {
                        self.experiences = response[0].experiences;
                        $timeout(
                            function() {
                                bsLoadingOverlayService.stop({
                                    referenceId: 'body-cv-loading'
                                });
                            }
                            , 1500
                        );
                    },
                    function(err) {
                        self.error = err;
                        self.isShowing = false;
                        bsLoadingOverlayService.stop({
                            referenceId: 'body-cv-loading'
                        });
                    }
                );


            };

            self.showExperiences = function(id) {
                if (self.isShowing) {
                    self.refreshCv(id);
                } else if (!self.isShowing) {
                    self.showCv(id);
                }
            };

            self.isDesktop = function() {
                return $window.innerWidth > 568;
            };

            self.reduceCv = function() {
                self.isShowing = false;
            };
        };

        return {
            restrict: "E",
            scope: {},
            bindToController: true,
            controller: ctrl,
            controllerAs: 'vm',
            templateUrl: 'app/templates/_cvScreen.html'
    };
}]);
