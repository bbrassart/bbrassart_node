var templateUrl = require('ngtemplate-loader!html-loader!./cv.template.html');


var CvController = function(
  mainService,
  bsLoadingOverlayService,
  $timeout,
  $window
) {
    var self = this;
    self.experiences = [];
    self.tagColors = ['development', 'tech', 'geek', 'code'];

    self.dropdown = {
      isExpanded: false
    };

  /**
   * If dropdown is expanded, trigger loading effect on experiences div and load next XP.
   * If dropdown is not expanded, trigger loading effect on header and load next XP.
   *
   * @param {Number} id
   *
   * @returns {undefined}
   */
    self.showExperiences = function(id) {
      var loadingMaskName =
        self.dropdown.isExpanded ? 'body-cv-loading' : 'header-cv-loading';

      bsLoadingOverlayService.start({
        referenceId: loadingMaskName
      });

      var timeoutInMs = self.dropdown.isExpanded ? 1800 : 200;

      mainService
        .getExperiences({id: id})
        .$promise
        .then(function(response) {
          self.experiences = response.experiences;
          $timeout(
            function () {
              if(!self.dropdown.isExpanded) {
                self.dropdown.isExpanded = true;
              }
              bsLoadingOverlayService.stop({
                referenceId: loadingMaskName
              });
            }
           , timeoutInMs
          );
        }).catch(function (err) {
          self.error = err;
          self.dropdown.isExpanded = false;
          bsLoadingOverlayService.stop({
            referenceId: loadingMaskName
          });
        });
    };

    self.isDesktop = function() {
        return $window.innerWidth > 568;
    };

  /**
   * Hide experiences div.
   *
   * @returns {undefined}
   */
    self.reduceCv = function() {
        self.dropdown.isExpanded = false;
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