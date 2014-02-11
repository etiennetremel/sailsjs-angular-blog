app.controller('PostIndexCtrl', ['$scope', '$routeParams', 'growl', 'Post', function ($scope, $routeParams, growl, Post) {
  var page = $routeParams.page || 1;

  if ($routeParams.query) {
    $scope.datas = Post.search({page: page, query: $routeParams.query});
    $scope.prevLink = '/search?q=' + $routeParams.query + '&page=' + ($scope.datas.currentPage - 1);
    $scope.nextLink = '/search?q=' + $routeParams.query + '&page=' + ($scope.datas.currentPage + 1);
  } else {
    $scope.datas = Post.index({page: page});
    $scope.prevLink = /page/ + ($scope.datas.currentPage - 1);
    $scope.nextLink = /page/ + ($scope.datas.currentPage + 1);
  }
}]);