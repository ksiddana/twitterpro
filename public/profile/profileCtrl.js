angular.module('profile.ctrl', ['db.factory', 'tweet.factory'])
  
  .controller('profileCtrl',['$scope','dbFactory', 'tweetFactory', '$log',function($scope, dbFactory, tweetFactory, $log){
    $scope.user = {};
    $scope.toggle = 0;
    console.log('in profileCtrl');
    // load "users" profile
    tweetFactory.getUserObj("1213Coder", function (user){ $scope.user.twitter = user; });

    // create and invoke functions to refresh $scope from db;
    // get data and save to scope
    $scope.cronHandler = function (cronType, value) {
      console.log(cronType, value);
      $scope.userCron[cronType] = value;
    };

    $scope.makeCronTab = function (cron) {
      var result = '';
      if (!cron) {
        cron = $scope.userCron;
      }
      for (var key in cron) {
        if (cron[key] === 'every') {
          result += '* ';
        } else {
          result += cron[key] + ' ';
        }
      }
      console.log(result);
      result = result.substring(0, result.length - 1);
      console.log(result);
      return result;
    };

    // targets
    $scope.fetchTargets = function () {
      dbFactory.getModel('target', '/all/true', function (results){
        $scope.targets = results;
        console.log('results from fetching all targets: ', results);
      });
    };
    // messages
    $scope.fetchMessages = function () {
      dbFactory.getModel('message', '/all/true', function (results){
        $scope.messages = results;
      });
    };
    // hashtags
    $scope.fetchHashtags = function () {
      dbFactory.getModel('hashtag', '/all/true', function (results){
        $scope.hashtags = results;
      });      
    };
    // invoke
    $scope.fetchTargets();
    $scope.fetchMessages();
    $scope.fetchHashtags();


    // functions for creating models
    // callback called after adding a member;

    // targets
    $scope.addTarget = function (newTarget) {
      console.log('before', newTarget);
      newTarget.interval = $scope.makeCronTab();
      console.log('after', newTarget);
      dbFactory.createModel('target', newTarget, function(results){
        $scope.fetchTargets();
      });
    };

    // messages
    $scope.addMessage = function (message) {
      dbFactory.createModel('message', message, function (results) {
        $scope.fetchMessages();
      });
    };

    // hashtags
    $scope.addHashtag = function (hashtag) {
      dbFactory.createModel('hashtag', hashtag, function (results){
        $scope.fetchHashtags();
      });
    };

    $scope.logger = function(i) {
      $scope.toggle = i;
    };

    // dropdowns
    $scope.userCron = {
      minute:'every',
      hour:'every',
      day: 'every',
      month:'every',
      dayOfWeek:'every',
    };


    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status1 = {
      isopen: false
    };

    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      console.log('event', $event);
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
      
    };
    



  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));





  },
  ]);