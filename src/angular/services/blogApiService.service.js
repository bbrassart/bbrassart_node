angular.module('myAngular')
  .service('blogApiService', [
    'apiService',
    function(
      apiService
    ) {
      return {
        get: function(idParam) {
          return apiService.get({operator: 'blogs'}, idParam);
        }
      }
    }
  ]);
