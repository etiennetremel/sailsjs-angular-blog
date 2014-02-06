'use strict';


//
// Controllers
// ---------------------------

angular.module('blogApp.controllers', [])

  .controller('NavController', ['$scope', '$rootScope', '$location', 'growl', 'Auth', function ($scope, $rootScope, $location, growl, Auth) {
    $scope.search = function () {
      $location.path('/search/' + $scope.searchQuery);
    };

    $scope.logout = function () {
      Auth.logout().then(function (res) {
        $rootScope.isAuthenticated = false;
        growl.addSuccessMessage('You have been logged out.');
      });
    };
  }])

  .controller('AuthController', ['$scope', '$rootScope', 'growl', 'Auth', function ($scope, $rootScope, growl, Auth) {
    $scope.username = '';
    $scope.password = '';

    $scope.login = function () {
      $scope.errorMessage = false;

      Auth.login({
        username: $scope.username,
        password: $scope.password
      }).then(function (res) {

        $scope.password = '';

        if (res.status === 'success') {
          $scope.$broadcast('event:auth-confirmed');
          $rootScope.isAuthenticated = true;
          growl.addSuccessMessage('Your are now authenticated.');
        } else {
          $scope.$broadcast('event:auth-failed');
          $rootScope.isAuthenticated = false;
          $scope.errorMessage = 'Authentification failed. Combination username/password incorrect.';
        }
      }, function (err) {
        growl.addErrorMessage('Something goes wrong, Error type:' + err);
      });
    };
  }])

  .controller('IndexCtrl', ['$scope', '$routeParams', 'growl', 'Post', function ($scope, $routeParams, growl, Post) {
    var page = $routeParams.page || 1;

    Post.findAll(page).then(function (posts) {
      $scope.datas = posts;
      $scope.prevLink = /page/ + (posts.currentPage - 1);
      $scope.nextLink = /page/ + (posts.currentPage + 1);
    });
  }])

  .controller('SearchCtrl', ['$scope', '$routeParams', 'growl', 'Post', function ($scope, $routeParams, growl, Post) {
    var page = $routeParams.page || 1,
        query = $routeParams.query || '';

    $scope.pageTitle = 'Search for `' + query + '`';
    $scope.paginateLink = 'search/';

    Post.search(query, page).then(function (posts) {
      $scope.datas = posts;
      $scope.prevLink = '/search?q=' + query + '&page=' + (posts.currentPage - 1);
      $scope.nextLink = '/search?q=' + query + '&page=' + (posts.currentPage + 1);
    }, function (err) {
      growl.addErrorMessage('Something goes wrong, Error type:' + err);
    });
  }])

  .controller('ShowPostCtrl', ['$scope', '$routeParams', '$location', 'growl', 'Post', function ($scope, $routeParams, $location, growl, Post) {
    Post.find($routeParams.id).then(function (post) {
      $scope.post = post;
    });

    $scope.destroyPost = function () {
      Post.destroy($scope.post.id).then(function () {
        growl.addSuccessMessage('Post has been successfully deleted.');
        $location.path('/');
      }, function (err) {
        growl.addErrorMessage('Something goes wrong, Error type:' + err);
      });
    };
  }])

  .controller('CreatePostCtrl', ['$scope', '$location', 'growl', 'Post', function ($scope, $location, growl, Post) {
    $scope.pageTitle = 'New post';
    $scope.buttonLabel = 'Publish';
    $scope.post = {};

    $scope.submit = function () {
      Post.create($scope.post).then(function (post) {
        growl.addSuccessMessage('Post <strong>' + post.title + '</strong> has been successfully created.');
        $location.path('/' + post.slug + '/' + post.id);
      }, function (err) {
        growl.addErrorMessage('Something goes wrong, Error type:' + err);
      });
    };
  }])

  .controller('UpdatePostCtrl', ['$scope', '$location', '$routeParams', 'growl', 'Post', function ($scope, $location, $routeParams, growl, Post) {
    $scope.pageTitle = 'Edit post';
    $scope.buttonLabel = 'Update';
    $scope.post = {};
    $scope.post.categories = [];

    Post.find($routeParams.id).then(function (post) {
      $scope.post = post;
    });

    $scope.submit = function () {
      Post.update($scope.post).then(function (post) {
        growl.addSuccessMessage('Post <strong>' + post.title + '</strong> has been successfully updated.');
        $location.path('/' + post.slug + '/' + post.id);
      }, function (err) {
        growl.addErrorMessage('Something goes wrong, Error type:' + err);
      });
    };
  }]);