var templateUrl = require('ngtemplate-loader!html-loader!./github.template.html');


var GithubController = function(
  mainService,
  bsLoadingOverlayService,
  $window,
  $timeout
) {
  var self = this;
  var buttonTextChangeTimeout;
  self.githubProjects = [];
  self.buttonText = "See my profile";

  self.dropdown = {
    isExpanded: false
  };

  self.isDesktop = function() {
    return $window.innerWidth > 558;
  };

  var getGithubSuccessCallback = function(response) {
    self.githubProjects = response;
    $timeout(
      function() {
        self.dropdown.isExpanded = true;
        self.buttonText = "Make me smaller";
        bsLoadingOverlayService.stop({
          referenceId: 'github-loading'
        });
      }, 200
    );
  };

  var getGithubErrorCallback = function(err) {
    self.error = err;
    self.dropdown.isExpanded = false;
    bsLoadingOverlayService.stop({
      referenceId: 'github-loading'
    });
  };

  self.performRequest = function() {
    bsLoadingOverlayService.start({
      referenceId: 'github-loading'
    });
    mainService
      .getGithub()
      .$promise
      .then(getGithubSuccessCallback)
      .catch(getGithubErrorCallback);
  };

  /**
   * If dropdown is expanded, hide repos section and change text.
   * If repos have been populated but dropdown wasn't expanded, show repos sections and change text
   * button
   * If request to Github repos hasn't been triggered yet, trigger it, expand div and change button
   * text.
   *
   * @returns {null|undefined}
   */
  self.toggleGithub = function() {
    if (self.dropdown.isExpanded) {
      self.dropdown.isExpanded = false;
      $timeout.cancel(buttonTextChangeTimeout);
      buttonTextChangeTimeout = $timeout(
        function() {
          self.buttonText = "See my profile";
        }, 500
      );
      return null;
    }
    if (self.githubProjects.length) {
      self.dropdown.isExpanded = true;
      $timeout.cancel(buttonTextChangeTimeout);
      buttonTextChangeTimeout = $timeout(
        function() {
          self.buttonText = "Make me smaller";
        }, 200
      );
      return null;
    }
    self.performRequest();
  };
};

angular.module('myAngular')
  .component('github', {
    controller: [
      'mainService',
      'bsLoadingOverlayService',
      '$window',
      '$timeout',
      GithubController
    ],
    controllerAs: 'vm',
    templateUrl: templateUrl
});