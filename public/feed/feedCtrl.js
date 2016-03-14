angular.module('feed.ctrl', ['tweet.factory'])

.controller('feedCtrl', ['$scope', 'tweetFactory', '$http', '$rootScope', '$log', function($scope, tweetFactory, $http, $rootScope, $log) {
  console.log('feedCTRL');
  $scope.streaming = true;
  $scope.tweets = [];
  tweetFactory.stream.on('tweets', function(data) {
    tweetFactory.handleTweet(data[0]);
    if ($scope.streaming) {
      $scope.tweets = data.concat($scope.tweets);
    }
  });
  $scope.changeStream = function(query) {
    $http.get('//localhost:3000/twitterStream/' + query).then(function(results) {
      console.log("success");
    });
  };
  $scope.pauseStream = function() {
    $log.info('clicked');
    $scope.streaming = !$scope.streaming;
    $log.log('streaming?: ', $scope.streaming);
  };
}, ]);
