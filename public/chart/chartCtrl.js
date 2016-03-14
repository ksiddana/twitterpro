angular.module('chart.ctrl', [])

.controller('chartCtrl', ['$scope', 'tweetFactory', '$http', '$rootScope', function($scope, tweetFactory, $http, $rootScope) {
  $scope.showChart = false;
  // $scope.series = ['test'];
  // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  // $scope.data = [300, 500, 100];
  console.log('chartCTRL');
  $scope.options = {
    responsive: true,
    maintainAspectRatio: true,
    barDatasetSpacing: 1,
    barShowStroke: true,
    barStrokeWidth: 2,
    barValueSpacing: 5
  };

  $rootScope.$watch('hashTagKeys', function() {
    console.info('hashtagkeys changed');
    $scope.labels = $rootScope.hashTagKeys;
    $scope.data = $rootScope.hashTagValues;
    $scope.showChart = true;
  });



  $scope.tweets = [];
  $scope.test = function(tweet) {
    console.log(tweet);
  };

}, ]);
