app.factory('apiService', ['$resource',function($resource) {

  var baseUrl = "/api/v1/:operator/:id";
  return $resource(baseUrl, {operator: '@operator', id: '@id'});

}]);
