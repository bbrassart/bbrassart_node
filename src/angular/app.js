// Node modules dependencies
require('angular');
require('angular-animate');
require('angular-resource');
require('angular-sanitize');
require('angular-loading-overlay');
require('angular-loading-overlay-spinjs');

var dependencies = [
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'bsLoadingOverlay',
  'bsLoadingOverlaySpinJs'
];

angular.module('myAngular', dependencies);

// App config
require('./app.run');
// App components
require('./components/blog.component');
require('./components/cv.component');
require('./components/github.component');
// App services
require('./services/apiService.service');
require('./services/blogApiService.service');
require('./services/cvApiService.service');
require('./services/githubApiService.service');
require('./services/mainService.service');