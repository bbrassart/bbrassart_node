var templateUrl = require('ngtemplate-loader!html-loader!./blog.template.html');

var BlogController = function(
  $sce,
  mainService,
  bsLoadingOverlayService,
  $window,
  $timeout
) {
  var self = this;
  self.lastArticleIndex = 3;
  self.blog = {};
  self.longForm = false;

  self.isLast = function(index) {
    return index === self.lastArticleIndex;
  };

  self.isFirst = function(index) {
    return index === 0;
  };

  self.isMiddle = function(index) {
    return index !== self.lastArticleIndex && index !== 0;
  };

  var getBlogSuccessCallback = function(response) {
    self.blog = response;
    self.trustedLongText = $sce.trustAsHtml(self.blog.text);
    $timeout(
      function() {
        bsLoadingOverlayService.stop({
          referenceId: 'blog-loading'
        });
      }, 50
    );
  };

  self.performRequest = function(idParam) {
    mainService
      .getBlog(idParam)
      .$promise
      .then(getBlogSuccessCallback);
  };

  self.triggerPreviousPost = function(index) {
    bsLoadingOverlayService.start({
      referenceId: 'blog-loading'
    });
    self.backToSmallForm();
    self.performRequest({id: index - 1});
  };

  self.triggerNextPost = function(index) {
    bsLoadingOverlayService.start({
      referenceId: 'blog-loading'
    });
    self.backToSmallForm();
    self.performRequest({id: index +1});
  };

  self.backToSmallForm = function() {
    self.longForm = false;
    $window.location.href = "#blog";
  };

  self.isLongForm = function() {
    self.longForm = true;
  };

  self.init = function() {
    bsLoadingOverlayService.start({
      referenceId: 'blog-loading'
    });
    self.performRequest({id: self.lastArticleIndex});
  };

  self.init();
};

angular.module('myAngular')
  .component('blog', {
    controller: [
      '$sce',
      'mainService',
      'bsLoadingOverlayService',
      '$window',
      '$timeout',
      BlogController
    ],
    controllerAs: 'vm',
    templateUrl: templateUrl
  });