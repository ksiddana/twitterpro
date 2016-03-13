angular.module('profile.ctrl', ['db.factory', 'tweet.factory'])
  .controller('profileCtrl',['$scope','dbFactory', 'tweetFactory',function($scope, dbFactory, tweetFactory){
    $scope.user = {};
    $scope.toggle = 0;
    console.log('in profileCtrl');
    // load "users" profile
    tweetFactory.getUserObj("1213Coder", function (user){ $scope.user.twitter = user; });

    // get data and save to scope
    // targets
    dbFactory.getModel('target', '/all/true', function (results){
      $scope.targets = results;
    });
    // messages
    dbFactory.getModel('message', '/all/true', function (results){
      $scope.messages = results;
    });
    // hashtags
    dbFactory.getModel('hashtags', '/all/true', function (results){
      $scope.hashtags = results;
    });

    // $scope.addTarget = function (handle, interval, callback){
    //   dbFactory.addTarget(handle,interval,function(obj){
    //     console.log('success in add target', obj.data);
    //     $scope.handles = obj.data; 
    //   });
    // };
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
    $scope.logger = function(i) {
      $scope.toggle = i;
    }
  },
  ]);