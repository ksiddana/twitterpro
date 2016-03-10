
  angular.module('db.factory', [])

.factory('dbFactory', ['$http','$rootScope', function ($http, $rootScope) {
  var factory = {};


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
  return factory;
},
]);
