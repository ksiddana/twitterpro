
  angular.module('db.factory', [])

.factory('dbFactory', ['$http','$rootScope', function ($http, $rootScope) {
  var factory = {};

//targets
  factory.getTargets = function (callback) {
    console.log('requesting handles');
    $http.get('//localhost:3000/allTargets').then(function(obj){
      console.log('GOT handles', obj);
      callback(obj);
    });
  };

  factory.addTarget = function (handle, interval, callback) {
   console.log('adding handle: ', handle);
   $http.post('//localhost:3000/addTarget', {handle: handle, interval:interval}).then(function(obj){
      console.log('factory success invoking callback');
      callback(obj);
   });
  };
  // messages
  factory.getMessages = function (callback) {
    console.log('requesting handles');
    $http.get('//localhost:3000/getMessages').then(function(obj){
      console.log('GOT messages', obj);
      callback(obj);
    });
  };

  factory.addMessage = function (text, callback) {
   console.log('adding message: ', text);
   $http.post('//localhost:3000/addMessage', {text:text}).then(function(obj){
      console.log('factory success invoking callback');
      callback(obj);
   });
  };
  //hashtags
  factory.getHashTags = function (callback) {
    console.log('requesting hashtags');
    $http.get('//localhost:3000/getHashTags').then(function(obj){
      console.log('GOT hashtags', obj);
      callback(obj);
    });
  };

  factory.addHashTag = function (text, callback) {
   console.log('adding hashtag: ', text);
   $http.post('//localhost:3000/addHashTag', {text:text}).then(function(obj){
      console.log('factory success invoking callback');
      callback(obj);
   });
  };
  // users
  factory.createUser = function (user) {
    user.auth ? user.auth = user.auth : user.auth = 0;

    $http.post('//localhost:3000/users', user).then(function (user) {
      console.log('success saving user!', user);
    });
  };


  return factory;
},
]);
