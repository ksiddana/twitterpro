angular.module('profile.ctrl', ['db.factory', 'tweet.factory'])
  .controller('profileCtrl',['$scope','dbFactory', 'tweetFactory',function($scope, dbFactory, tweetFactory){
    $scope.user = {};
    console.log('in profileCtrl');
    // load "users" profile
    tweetFactory.getUserObj("1213Coder", function (user){ $scope.user.twitter = user; });

    dbFactory.getTargets(function(obj){
      console.log('handles');
      console.log(obj.data);
      $scope.handles = obj.data;
    });

    $scope.addTarget = function (handle, interval, callback){
      dbFactory.addTarget(handle,interval,function(obj){
        console.log('success in add target', obj.data);
        $scope.handles = obj.data; 
      });
    };
      dbFactory.getMessages(function(obj){
      console.log('messages');
      console.log(obj.data);
      $scope.messages = obj.data;
    });

    $scope.addMessage = function (text, callback){
      dbFactory.addMessage(text,function(obj){
        console.log('success in add message', obj.data);
        $scope.messages = obj.data; 
      });
    };
       dbFactory.getHashTags(function(obj){
      console.log('hashtag');
      console.log(obj.data);
      $scope.hashTags = obj.data;
    });

    $scope.addHashTag = function (text, callback){
      dbFactory.addHashTag(text,function(obj){
        console.log('success in add hashtag', obj.data);
        $scope.hashTags = obj.data; 
      });
    };
  },
  ]);