'use strict';


//
// Services
// ---------------------------

angular.module('blogApp.services', ['ngResource'])

  .factory('Post', ['$resource', 'Globals', function ($resource, Globals) {
    return $resource(Globals.apiPrefix + '/posts/:id', { id: "@_id" }, {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', params: { page: 'page' } },
      'show':    { method: 'GET' },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' },
      'search':  { method: 'GET', action: 'search', params: { query: 'query', page: 'page' } }
    });
  }])

  .factory('$fileUpload', ['$http', '$q', 'Globals', function ($http, $q, Globals) {
    var acceptedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    var formatData = function (file) {
      var formData = new FormData();
      formData.append('file', file);
      return formData;
    };

    return {
      upload: function (file) {
        var defer = $q.defer();

        if (acceptedTypes.indexOf(file.type) > 0) {
          $http({
            method: 'POST',
            url: Globals.apiPrefix + '/upload',
            data: formatData(file),
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          })
          .success(function (data, status, headers, config) {
            if (status === '400') {
              defer.reject('Something went wrong, please check if AWS is correctly defined.');
            } else {
              defer.resolve(data.url);
            }
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        } else {
          defer.reject('Wrong file type');
        }
        return defer.promise;
      }
    }
  }])

  .factory('Auth', ['$http', '$q', '$route', '$rootScope', '$location', 'Globals', function ($http, $q, $route, $rootScope, $location, Globals) {

    // If user not logged in and page requested need authentification, redirect to home page
    $rootScope.$on('$routeChangeSuccess', function (next, current) {
      var authRequired = $route.current && $route.current.needAuthentication;

      if (authRequired && !$rootScope.isAuthenticated) {
        $location.url('/');
      }
    });

    return {

      // Login
      login: function (user) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: Globals.apiPrefix + '/login',
            data: user
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      },

      // Logout
      logout: function () {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: Globals.apiPrefix + '/logout'
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      }
    };
  }]);