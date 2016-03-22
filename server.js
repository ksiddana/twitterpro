var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var schedule = require('node-schedule');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var passport = require('passport');
var tweetBot = require('./twitter.js');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 * dotenv.load({ path: '.env.example' });
 */
dotenv.load();

/**
 * API keys and Passport configuration.
 */
var passportConfig = require('./config/passport');

/**
 * Create Express server and set-up socket.io
 */
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require('socket.io').listen(server);

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Express configuration.
 */
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////
/////////dbroutes//////////////////
///////////////////////////////////

// fetch from db
app.get('/api/models/:model/:key/:value', function(req, res) {
  var searchObject = {};
  searchObject[req.params.key] = req.params.value;
  db.helpers.handleGet(req.params.model, searchObject, function(results) {
    res.status(200).send(results);
  });
});
// create new model
app.post('/api/models/:model', function(req, res) {
  db.helpers.handlePost(req.params.model, req.body, function(results) {
    res.status(200).send(results);
  });
});
// delete a model
app.delete('/api/models/:model/:key/:value', function(req, res) {
  var searchObject = {};
  searchObject[req.params.key] = req.params.value;

  db.helpers.handleDelete(req.params.model, searchObject, function(results) {
    res.status(200).send(results);
  });
});
// change a model
app.put('/api/models/:model', function(req, res) {
  db.helpers.handlePut(req.params.model, req.body, function(results) {
    res.status(200).send(results);
  });
});

//
// twitter
//
app.get('/twitter/statuses/show/:id', function(req, res) {
  console.log("SERVER: get /twitter/statuses/" + req.params.id);
  tweetBot.getTweetById(req.params.id, function(results) {
    console.log('SERVER: tweet fetched');
    res.status(200).send(results);
  });
});
app.post('/userObj', function(req, res) {
  tweetBot.getUserObj(req.body.handle, res);
});

app.post('/twitterStream', function(req, res) {
  console.log('post /twitterStream recieved: changing stream');
  tweetBot.changeStream(io, req.body);
  res.status(200).send('SERVER: changed stream');
});


//TODO: this is terrible need to fix.
var autoTweet = function() {
  var targets, messages, hashtags;
  // wait
  db.Target.find({}).then(function(data) {
    targets = data;
    console.log('targets done');
    targets.forEach(function(target) {
      console.log(target.handle);
    });
    console.log('________________');
    // wait
    db.Message.find({}).then(function(data) {
      messages = data;
      console.log('messages done');
      messages.forEach(function(message) {
        console.log(message.text);
      });
      console.log('________________');
      //wait
      db.HashTag.find({}).then(function(data) {
        hashtags = data;
        console.log('hashtags done');
        hashtags.forEach(function(hashtag) {
          console.log(hashtag.text);
        });
        console.log('________________');
        // console.log('hashtags done', hashtags);

        function randomElement(array) {
          var size = array.length;
          return array[Math.floor(Math.random() * size)];
        };

        for (var i = 0; i < targets.length; i++) {
          targets[i].loop = new schedule.scheduleJob(targets[i].interval, function(target) {
            message = randomElement(messages).text + ' #' + randomElement(hashtags).text;
            console.log('cron message________@' + target.handle + '_________');
            console.log('message: ', message);
            // uncomment to enable tweets
            tweetBot.sendTweetToUser(target.handle, message);
          }.bind(null, targets[i], messages, hashtags));
          console.log(targets[i].interval);
        }
      });
    });
  });
};

// autoTweet();

console.log('app listening: ', port);
tweetBot.init(io);
