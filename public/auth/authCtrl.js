angular.module('auth.ctrl', [])

.controller('authCtrl',['$scope', 'dbFactory', function ($scope, dbFactory) {
  console.log('in authCTRL');
  $scope.createUser = function(user) {
    console.log('attempting to create a new user');
    dbFactory.createUser(user);
  };
}]);