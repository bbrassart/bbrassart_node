app.factory ('mainService', ['blogApiService', 'githubApiService', 'cvApiService', function(blogApiService, githubApiService, cvApiService) {
    var self = this;
    self.blog = {};

    self.getBlog = function(idParam) {
        return blogApiService.get(idParam);
    };

    self.getExperiences = function(idParam) {
        return cvApiService.query(idParam);
    };

    self.getGithub = function() {
        return githubApiService.query();
    };
    return self;
}]);
