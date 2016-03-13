angular.module('feed.ctrl', ['tweet.factory'])
  
.controller('feedCtrl', ['$scope','tweetFactory','$http', '$rootScope', function ($scope, tweetFactory, $http, $rootScope) {
  console.log('feedCTRL');
  
  $scope.tweets=[];
  $scope.test = function(tweet){
    console.log(tweet);
  };
  tweetFactory.stream.on('tweets', function(data){
    tweetFactory.handleTweet(data[0]);
    $scope.tweets = data.concat($scope.tweets);
      // if($scope.tweets.length > 5){
    //   $scope.tweets.length = 5;
    // }
  });
},
]);
