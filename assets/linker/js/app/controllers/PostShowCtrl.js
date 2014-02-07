app.controller('PostShowCtrl', ['$scope', '$routeParams', '$location', 'growl', 'Post', function ($scope, $routeParams, $location, growl, Post) {
  // Post.find($routeParams.id).then(function (post) {
  //   $scope.post = post;
  // });

  $scope.post = Post.show({id: $routeParams.id});

  $scope.destroyPost = function () {
    Post.destroy($scope.post.id).then(function () {
      growl.addSuccessMessage('Post has been successfully deleted.');
      $location.path('/');
    }, function (err) {
      growl.addErrorMessage('Something goes wrong, Error type:' + err);
    });
  };
}]);