'use strict';


//
// Services
// ---------------------------

angular.module('blogApp.services', ['ngResource'])

  .factory('Post', ['$http', '$q', 'Globals', function ($http, $q, Globals) {
    return {

      // Get post by id
      find: function (postId) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: Globals.apiUrl + 'post/' + postId
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      },

      // Get all posts
      findAll: function (page) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: Globals.apiUrl + 'posts/' + page
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      },

      // Search for posts
      search: function (query, page) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: Globals.apiUrl + 'posts/search/' + query + '/' + page
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      },

      // Create post
      create: function (post) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: Globals.apiUrl  + 'post',
            data: post
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      },

      // Update post
      update: function (post) {
        var defer = $q.defer();
        $http({
            method: 'PUT',
            url: Globals.apiUrl + 'post/' +  post.id,
            data: post
          })
          .success(function (data, status, headers, config) {
            defer.resolve(data);
          })
          .error(function (data, status, headers, config) {
            defer.reject(status);
          });
        return defer.promise;
      },

      // Delete post
      destroy: function (id) {
        var defer = $q.defer();
        $http({
            method: 'DELETE',
            url: Globals.apiUrl + 'post/' + id
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
            url: Globals.apiUrl + 'upload',
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


      // var formData = new FormData();
      // for(i in files) {
      //   formData.append('file_'+i, files[i]);
      // }
      // console.log(formData);
      // $http({method: 'POST', url: '/api/files', data: formData, headers: {'Content-Type': undefined}, transformRequest: angular.identity})
      // .success(function(data, status, headers, config) {

      // });
    }
  }])

  .factory('Auth', ['$http', '$q', '$route', '$rootScope', '$location', 'Globals', function ($http, $q, $route, $rootScope, $location, Globals) {

    // If user not logged in and page requested need authentification, redirect to home page if
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
            url: Globals.apiUrl + 'login',
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
            url: Globals.apiUrl + 'logout'
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