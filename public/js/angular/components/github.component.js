var GithubController = function(
  mainService,
  bsLoadingOverlayService,
  $window,
  $timeout
) {
  var self = this;
  self.githubProjects = [];
  self.buttonText = "See my profile";
  self.isShowing = false;

  self.isDesktop = function() {
    return $window.innerWidth > 558;
  };

  var getGithubSuccessCallback = function(response) {
    self.githubProjects = response;
    $timeout(
      function() {
        self.isShowing = true;
        self.buttonText = "Make me smaller";
        bsLoadingOverlayService.stop({
          referenceId: 'github-loading'
        });
      }, 200
    );
  };

  var getGithubErrorCallback = function(err) {
    self.error = err;
    self.isShowing = false;
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

  self.toggleGithub = function() {
    if (self.isShowing) {
      self.isShowing = false;
      self.buttonText = "See my profile";
    } else if (!self.isShowing) {
      if (self.githubProjects.length) {
        self.isShowing = true;
        self.buttonText = "Make me smaller";
      }
      else {
        self.performRequest();
      }
    }
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
    templateUrl: '/app/js/angular/components/github.template.html'
});