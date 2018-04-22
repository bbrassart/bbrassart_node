angular.module('myAngular')
  .service('cvApiService', [
    'apiService',
      function(
        apiService
      ) {
        return {
          query: function(idParam) {
            return apiService.query({operator: 'years'}, idParam);
          }
        }
      }
  ]);
