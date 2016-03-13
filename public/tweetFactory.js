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
var counter = {};
factory.handleTweet = function (tweet) {
    var tweetArr = tweet.text.split(' ');
    // loop trough the words in the tweet
    for (var i = 0; i < tweetArr.length; i++) {
      // if a word is a hashtag
      if (/(^|\s)(#[a-z\d-]+)/.test(tweetArr[i])) {
        // increment the counter
        if (!counter[tweetArr[i]]) {
          counter[tweetArr[i]] = 0;
        }
        counter[tweetArr[i]]++;
        // reset the root scope arrays
        $rootScope.hashTagKeys = [];
        $rootScope.hashTagValues = [];
        // loop through the counter
        for (var key in counter) {
          if (counter[key] > 0 && key.length < 17) {
            var phase = $rootScope.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                //push key
                $rootScope.hashTagKeys.push(key);
                // push value
                $rootScope.hashTagValues.push(counter[key]);  
              } else {
                $rootScope.$apply(function(){
                //push key
                $rootScope.hashTagKeys.push(key);
                // push value
                $rootScope.hashTagValues.push(counter[key]);
              });
              }
            } else {
              console.log('skipping key: ', key);
            }
          }
        }
      }
    };
    return factory;
  },
  ]);
