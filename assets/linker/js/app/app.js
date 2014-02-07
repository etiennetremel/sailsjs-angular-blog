'use strict';


//
// Resolver
// ---------------------------

var resolve = {

  // Get from SailsJS the Cross-Site Request Forgery Protection value
  getCsrfToken: function ($q, $http, Globals) {
    var defer = $q.defer();

    if ($http.defaults.headers.common['x-csrf-token']) {
      defer.resolve('getCsrfToken');
    } else {
      $http({
        method: 'GET',
        url: '/csrfToken'
      })
      .success(function (data, status, headers, config) {
        $http.defaults.headers.common['x-csrf-token'] = data._csrf;
        Globals.csrfToken = data._csrf;
        defer.resolve('getCsrfToken');
      })
      .error(function (data, status, headers, config) {
        defer.reject('getCsrfToken');
      });
    }

    return defer.promise;
  }
};


//
// Initialize application
// ---------------------------

var app = angular.module('blogApp', [

    // Angular dependencies
    'ngRoute',
    'ngSanitize',
    'ngCookies',

    // Angular plugins:
    'ngTagsInput',
    'angular-growl',

    // Application
    'blogApp.filters',
    'blogApp.services',
    'blogApp.directives',
    'blogApp.controllers'
  ])


  // Set global variables
  .constant('Globals', {
    apiPrefix: '/api',
    csrfToken: null
  })


  // Define routes
  .config(['$locationProvider', '$routeProvider', 'growlProvider', function ($locationProvider, $routeProvider, growlProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/post/index.html',
        controller: 'PostIndexCtrl',
        resolve: resolve
      })
      .when('/page/:page', {
        templateUrl: '/partials/post/index.html',
        controller: 'PostIndexCtrl',
        resolve: resolve
      })
      .when('/post/create', {
        templateUrl: '/partials/post/form.html',
        controller: 'PostEditCtrl',
        needAuthentication: true,
        resolve: resolve
      })
      .when('/post/:id/edit', {
        templateUrl: '/partials/post/form.html',
        controller: 'PostEditCtrl',
        needAuthentication: true,
        resolve: resolve
      })
      .when('/search/:query', {
        templateUrl: '/partials/post/index.html',
        controller: 'PostIndexCtrl',
        resolve: resolve
      })
      .when('/:slug/:id', {
        templateUrl: '/partials/post/show.html',
        controller: 'PostShowCtrl',
        resolve: resolve
      })
      .otherwise({
        templateUrl: '/partials/404.html'
      });

    $locationProvider.html5Mode(true);

    // Config Growl automatic closing notifications and HTML injection
    growlProvider.globalTimeToLive(5000);
    growlProvider.globalEnableHtml(true);
  }])

  // Set default user status
  .run(['$rootScope', function ($rootScope) {
    $rootScope.isAuthenticated = false;
  }]);