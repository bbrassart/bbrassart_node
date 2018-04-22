app.service('githubApiService', ['$resource',function($resource) {
    var baseUrl = "https://api.github.com/users/bbrassart/repos";
    return $resource(baseUrl);
}]);
