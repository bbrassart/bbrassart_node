app.factory('cvApiService', [
    'apiService', function(apiService) {
        return {
            query: function(idParam) {
                return apiService.query({operator: 'years'}, idParam);
            }
        }
    }
]);
