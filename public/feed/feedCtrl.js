angular.module('feed.ctrl', ['tweet.factory'])

.controller('feedCtrl', ['$scope', 'tweetFactory', '$http', '$rootScope', function($scope, tweetFactory, $http, $rootScope) {
  console.log('feedCTRL');

  $scope.tweets = [];
  tweetFactory.stream.on('tweets', function(data) {
    tweetFactory.handleTweet(data[0]);
    $scope.tweets = data.concat($scope.tweets);
  });
  $scope.changeStream = function(query) {
    $http.get('//localhost:3000/twitterStream/' + query).then(function(results) {
      console.log("success");
    });
  };
}, ]);
