angular.module('tweet.factory', [])

.factory('tweetFactory', ['$http','$rootScope', function ($http, $rootScope) {
  var factory = {};

  factory.getUserObj = function (handle, callback) {
   console.log('getting info for handle: ', handle);
   $http.post('//localhost:3000/userObj', {handle:handle}).then(function(user){
    
      console.log('got back this user',user);
      callback(user.data);
    
   });
  };

  factory.getMyTweets = function() {
    console.log('getting my tweets');
    $http.get('//localhost:3000/myTweets')
      .then(function(err, data) {
        console.log('err', err, 'data', data);
      });
  };
   var socket = io.connect('//localhost:3000');
    factory.stream = {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    };
  return factory;
},
]);
