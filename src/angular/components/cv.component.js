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
     * Success callback when first call to load experience is successful
     *
     * @returns {undefined}
     */
    var getShowCVSuccessCallback = function(response) {
      self.experiences = response[0].experiences;
      $timeout(
        function() {
          self.dropdown.isExpanded = true;
          bsLoadingOverlayService.stop({
            referenceId: 'header-cv-loading'
          });
        }
        , 200
      );
    };

    /**
     * Error callback executed if API call to load all XP fails
     *
     * @returns {undefined}
     */
    var getShowCVErrorCallback =  function(err) {
      self.error = err;
      self.dropdown.isExpanded = false;
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

  /**
   * Error callback executed if API call to load XP fails
   *
   * @returns {undefined}
   */
    var getExperiencesErrorCallback = function(err) {
      self.error = err;
      self.dropdown.isExpanded = false;
      bsLoadingOverlayService.stop({
        referenceId: 'body-cv-loading'
      });
    };

  /**
   * If dropdown is expanded, trigger loading effect on experiences div and load next XP.
   * If dropdown is not expanded, trigger loading effect on header and load next XP.
   *
   * @param {number} id
   *
   * @returns {null|undefined}
   */
    self.showExperiences = function(id) {
      if (self.dropdown.isExpanded) {
        bsLoadingOverlayService.start({
          referenceId: 'body-cv-loading'
        });

        mainService
          .getExperiences({id: id})
          .$promise
          .then(getExperiencesSuccessCallback)
          .catch(getExperiencesErrorCallback);

        return null;
      }

      bsLoadingOverlayService.start({
        referenceId: 'header-cv-loading'
      });

      mainService
        .getExperiences({id: id})
        .$promise
        .then(getShowCVSuccessCallback)
        .catch(getShowCVErrorCallback);
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