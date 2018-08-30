angular.module('myAngular')
  .service('cvApiService', [
    'apiService',
    function(
      apiService
    ) {
      return {
        get: function(idParam) {
          return apiService.get({operator: 'years'}, idParam);
        }
      }
    }
  ]);
