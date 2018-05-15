var templateUrl = require('ngtemplate-loader!html-loader!./cv.template.html');


var CvController = function(
  mainService,
  bsLoadingOverlayService,
  $timeout,
  $window
) {
    var self = this;
    self.isShowing = false;
    self.experiences = [];
    self.tagColors = ["design", "pure", "js", "yui"];

    var getShowCVSuccessCallback = function(response) {
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
    };

    var getShowCVErrorCallback =  function(err) {
      self.error = err;
      self.isShowing = false;
      bsLoadingOverlayService.stop({
        referenceId: 'header-cv-loading'
      });
    };

    var getExperiencesSuccessCallback = function(response) {
      self.experiences = response[0].experiences;
      $timeout(
        function() {
          bsLoadingOverlayService.stop({
            referenceId: 'body-cv-loading'
          });
        }
        , 1500
      );
    };

    var getExperiencesErrorCallback = function(err) {
      self.error = err;
      self.isShowing = false;
      bsLoadingOverlayService.stop({
        referenceId: 'body-cv-loading'
      });
    };

    self.showExperiences = function(id) {
      if (self.isShowing) {
        bsLoadingOverlayService.start({
          referenceId: 'body-cv-loading'
        });

        mainService
          .getExperiences({id: id})
          .$promise
          .then(getExperiencesSuccessCallback)
          .catch(getExperiencesErrorCallback);

      } else {

        bsLoadingOverlayService.start({
          referenceId: 'header-cv-loading'
        });

        mainService
          .getExperiences({id: id})
          .$promise
          .then(getShowCVSuccessCallback)
          .catch(getShowCVErrorCallback);
      }
    };

    self.isDesktop = function() {
        return $window.innerWidth > 568;
    };

    self.reduceCv = function() {
        self.isShowing = false;
    };
};

angular.module('myAngular')
  .component('cv', {
    controller: [
      'mainService',
      'bsLoadingOverlayService',
      '$timeout',
      '$window',
      CvController
    ],
    controllerAs: 'vm',
    templateUrl: templateUrl
  });