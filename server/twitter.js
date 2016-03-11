var Twitter = require('twitter');
var twitterKeys = require('./../twitterKeys.js');
var tweetLimit = 1;
var tweetTimeout = 3600000;
var likeLimit = 1;
var likeTimeout = 60000; 
var twit = new Twitter(twitterKeys);

var latestMentions = [];
var idStrings = {};
var tweetBot = {};

tweetBot.getUserObj = function (user,res) {
  twit.get('users/show', {screen_name:user}, function(err,obj){
    if (err) {
      console.log("error in getUserObj");
      console.log(err);
    }else{
      console.log('returned twitter obj')
      res.status(200).send(obj);
    }
  });
};

tweetBot.sendTweetToUser = function(user,tweet) {
  twit.post('statuses/update', {status: "@" + user + " " + tweet}, function (error, tweet) {
    if (error) {
      console.error(error);
    } else {
      console.log('--');
      console.log('tweeted', tweet);
      console.log('--');
    }
  });     
};
tweetBot.tweet = function(tweetString) {
  console.log('in tweetBot.tweet')
  twit.post('statuses/update', {status:tweetString} , function(err, tweet){
    if (err){
      console.log('tweet errored', err);
    } else {
      console.log('tweet success');
    }
  });
};

tweetBot.init = function(io){

  var tweetsBuffer = [];
  twit.stream('statuses/filter', { track:'javascript, angular, kendrick' }, function(stream){
    stream.on('connect', function(request) {
        console.log('Connected to Twitter API');
    });
     
    stream.on('disconnect', function(message) {
        console.log('Disconnected from Twitter API. Message: ' + message);
    });
     
    stream.on('reconnect', function (request, response, connectInterval) {
      console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
    });
    stream.on('data', function(tweet) {
      console.log('tweet');
      var msg = {};
      msg.text = tweet.text;
      msg.user = {
          name: tweet.user.name,
          image: tweet.user.profile_image_url
      };
      tweetsBuffer.push(msg);
   
      //send buffer only if full
      if (tweetsBuffer.length >= tweetLimit) {
          //broadcast tweets
          console.log('buffergone')
          io.sockets.emit('tweets', tweetsBuffer);
          tweetsBuffer = [];
      }
    });  
  });
};


// var tweetBot.init = function () {
//   twit.stream('statuses/filter', { track:'github 404,github down,phaser,grunt,splashbrothers,AngularJS,nodeJS,reactJS,chihuahua cute https, breaking news cnn, john oliver, kickflip,360 flip,10 stair,soccer goal,aapl' }, function (stream) {
//     stream.on('data', function(tweet)  {
//       var target = tweet.user.screen_name;
//       var tweet_id = tweet.id_str;
//       console.log('==================================');
//       console.log(target);
//       if (target === '1213Coder') {
//         return;
//       }
//       console.log('tweetsLeft: ', tweetLimit, 'favorites left: ', likeLimit);
//         console.log(tweet.text);

//       if (tweetLimit) {
//         tweetLimit--;
//         twit.post('statuses/retweet/' + tweet_id , function (error, tweet) {
//           setTimeout(function(){
//           tweetLimit++;
//           console.log('------------------|# tweets avail: ', tweetLimit);
//           },tweetTimeout);
//           if (error) {
//             console.error(error);
//           } else {
//             console.log('--');
//             console.log('retweeted');
//             console.log('--');
          

//           }
//         });     
//       } else if (likeLimit){
//         likeLimit--;
//         twit.post('favorites/create', { id:  tweet_id }, function (error, tweet) {

//           setTimeout(function(){
//           likeLimit++;
//           console.log('-----------------LIKES avail: ', likeLimit);
//           },likeTimeout);

//           if (error) {
//             console.error(error);
//           } else {
//             console.log('--');
//             console.log('favorited');
//             console.log('--');
//           }
//         });
//       } else {
//             console.log('--');
//             console.log('did nothing');
//             console.log('--');
//       }
//     });

//     stream.on('error', function (error) {
//       console.log(error);
//     });
//   });
// };

module.exports = tweetBot;



