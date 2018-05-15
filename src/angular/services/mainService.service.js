angular.module('myAngular')
  .service ('mainService', [
    'blogApiService',
    'githubApiService',
    'cvApiService',
    function(
      blogApiService,
      githubApiService,
      cvApiService
    ) {
    var self = this;

    self.getBlog = function(idParam) {
      return blogApiService.get(idParam);
    };

    self.getExperiences = function(idParam) {
      return cvApiService.query(idParam);
    };

    self.getGithub = function() {
      return githubApiService.query();
    };
  }]);