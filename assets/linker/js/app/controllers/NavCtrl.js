app.controller('NavCtrl', ['$scope', '$rootScope', '$location', 'growl', 'Auth', function ($scope, $rootScope, $location, growl, Auth) {
  $scope.search = function () {
    $location.path('/search/' + $scope.searchQuery);
  };

  $scope.logout = function () {
    Auth.logout().then(function (res) {
      $rootScope.isAuthenticated = false;
      growl.addInfoMessage('You have been logged out.');
    });
  };
}]);