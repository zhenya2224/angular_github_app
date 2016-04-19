myApp.controller('mainController', ['$scope','$http', function($scope, $http) {

  //var to hold search inputs
  $scope.search = '';
  //var to hold response from Github API
  $scope.userInfo = [];
  //var to hold stars
  $scope.userStars;
  //object to hold uservalues with stars
  $scope.useNameStars = {}
    //function to process request to Github API
  $scope.findGithubUser = function() {

    if ($scope.search.length > 1) {
      angular.forEach($scope.search, function(value, index) {
        $http.get('https://api.github.com/users/' + $scope.search[index] + '/repos')
          .success(function(result) {
            $scope.repos = result;
            (function countStars(response) {
              if (!(response instanceof Array)) {
                response = [response];
              }
              var stars = 0;
              for (var i = 0; i < response.length; i++) {
                stars += parseInt(response[i].stargazers_count);
              };
              $scope.userStars = stars;
              return $scope.userStars;
            }($scope.repos));

            $scope.useNameStars[$scope.search[index]] = $scope.userStars;
            $scope.userInfo.push($scope.repos);
          })
          .error(function(data, status) {})
      })
    } else if ($scope.search.length === 1) {
      $http.get('https://api.github.com/users/' + $scope.search + '/repos')
        .success(function(result) {
          $scope.repos = result;
        })
        .error(function(data, status) {})
    }
  }
}]);