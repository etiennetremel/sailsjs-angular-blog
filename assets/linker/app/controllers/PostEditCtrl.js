app.controller('PostEditCtrl', ['$scope', '$location', '$routeParams', 'growl', 'Post', function ($scope, $location, $routeParams, growl, Post) {

  if ($routeParams.id) {
    $scope.post = Post.show({ id: $routeParams.id });
    $scope.pageTitle = 'Edit post';
    $scope.buttonLabel = 'Update';
  } else {
    $scope.post = new Post();
    $scope.pageTitle = 'New post';
    $scope.buttonLabel = 'Publish';
  }

  $scope.submit = function () {

    var failure = function (err) {
      growl.addErrorMessage('Something goes wrong: ' + err);
    };

    if ($routeParams.id) {
      Post.update($scope.post, function (post) {
        growl.addSuccessMessage('Post <strong>' + post.title + '</strong> has been successfully updated.');
        $location.path('/' + post.slug + '/' + post.id);
      }, failure);
    } else {
      Post.create($scope.post, function (post) {
        growl.addSuccessMessage('Post <strong>' + post.title + '</strong> has been successfully created.');
        $location.path('/' + post.slug + '/' + post.id);
      }, failure);
    }
  };
}]);