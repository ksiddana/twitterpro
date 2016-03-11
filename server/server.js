var express = require('express');
var db = require('./db.js');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var tweetBot = require('./twitter.js');
var schedule = require('node-schedule');

var app = express();
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

app.post('/ezTweet', function (req,res){
  console.log('post to ezTweet recieved', req.body);
  tweetBot.tweet(req.body);
  res.status(200).send();
});





///////////////////////////////////
/////////dbroutes///////////////
///////////////////////////////////

app.get('/allTargets', function (req,res) {
  db.helpers.allTargets(res);
});
app.post('/addTarget', function (req,res) {
  db.helpers.addTarget(req.body.handle, req.body.interval, res);
});

////// messages
app.get('/getMessages', function (req,res) {
  db.helpers.getMessages(res);
});
app.post('/addMessage', function (req,res) {
  db.helpers.addMessage(req.body.text, res);
});
////// hashtags
app.get('/getHashTags', function (req,res) {
  db.helpers.getHashTags(res);
});
app.post('/addHashTag', function (req,res) {
  db.helpers.addHashTag(req.body.text, res);
});




/// twitter
app.post('/userObj', function (req,res) {
  tweetBot.getUserObj(req.body.handle, res);
});
// app.post('/data', function (req,res,next) {
//   var book = new db.books(req.body);
//   book.save(function (err, book) {
//     console.log('DB ERROR /book post',err, book)
//   });
//   res.status(200).send();

// });

// app.post('/dataUpdate', function (req,res,next) {
//   console.log('attempting to update book', req.body.title, req.body.price, req.body.quantity);
//   db.books.update({'title' : req.body.title}, { $set : {'price': req.body.price, 'quantity': req.body.quantity}}, function(err,data){
//     console.log('after update callback.  ERR', err)
//   })
//   res.status(200).send();
// });

// app.post('/dataDelete', function (req,res,next) {
//   console.log('attempting to delete book', req.body.title);
//   db.books.remove({'title' : req.body.title}, function(err,data){
//     console.log('after update callback.  ERR', err)
//   })
//   res.status(200).send();
// });
  
  /////////////////////////////////////
  //////////USERS//////////////////////
  /////////////////////////////////////

// app.post('/auth', function (req,res) {
//   db.users.find(req.body, function (err, data) {
//     res.status(200).send(data);
//   })
// })


// app.post('/user', function (req,res) {
//   var user = new db.users(req.body);
//   console.log(req.body)
//   user.save(function (err, user) {
//     console.error('\n\nDB ERROR /user post', user, err)
//   })
//   res.status(200).send();
// })
var autoTweet = function () {
  var targets,messages,hashtags;

  db.Target.find({}).then(function(data){
    targets = data;
    console.log('targets done', targets);

    db.Message.find({}).then(function(data){
      messages = data;
      console.log('messages done', messages);

      db.HashTag.find({}).then(function(data){
        hashtags = data;
        console.log('hashtags done', hashtags);

        function randomElement (array) {
          var size = array.length;
          return array[Math.floor(Math.random() * size)];
        };



      
        for (var i = 0; i < targets.length; i++) {
          targets[i].loop = new schedule.scheduleJob('* * * * *', function(target, messages){
            console.log('cron____________________');
            console.log(randomElement(messages).text, ' #' + randomElement(hashtags).text);
            // tweetBot.tweet(randomElement(messages).text, ' #' + randomElement(hashtags).text);
          }.bind(null, targets[i], messages, hashtags));
        }
      });
    });
  });
};
// autoTweet();  
console.log('app listening: ', port);
var server = app.listen(port);
var io = require('socket.io').listen(server);
tweetBot.init(io);    
