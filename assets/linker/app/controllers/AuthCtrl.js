app.controller('AuthCtrl', ['$scope', '$rootScope', 'growl', 'Auth', function ($scope, $rootScope, growl, Auth) {
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
}]);