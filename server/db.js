var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// specify which db to use and where it is.
mongoose.connect('mongodb://localhost/twitterBot');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connected error"));

db.once('open', function (){

  console.log("we're connected port:3000");

});

var TargetSchema = mongoose.Schema({
  handle: {
    type : String ,
    index : {
      unique : true
    } 
  },
  interval: String,
});

var MessageSchema = mongoose.Schema({
  text: {
    type : String ,
     index : {
      unique : true
    } 
  },
});

var HashTagSchema = mongoose.Schema({
  text: {
    type : String,
    index : {
      unique : true
    } 
  },
});

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  twitterId: String,
  admin: Number,
});

var Target = mongoose.model('target', TargetSchema);
var Message = mongoose.model('message', MessageSchema);
var HashTag = mongoose.model('HashTag', HashTagSchema);
var User = mongoose.model('User', UserSchema);

var helpers = {};
var models = {
  target:Target,
  message:Message,
  hashtag:HashTag,
  user:User,
};

// HANDLES GET REQUESTS TO /API/MODELS 
// Either gets all or a specific instance.
helpers.handleGet = function(model,searchObject, callback) {

  console.log('DB multi route handler \nseraching for: ', model);
  console.log('DB search parameters', searchObject);
  // check to see if we should get all
  if (searchObject.all) {

    console.log('DB searching for all ');
    models[model].find({}).then(function(results){

      console.log('DB got all ', model);
      callback(results);
    });
  } else {
    console.log('searching for single');
    models[model].find(searchObject).then(function(obj){

      console.log('DB Success');
      callback(obj);
    });
  }
};

//HANDLES DELETE REQUESTS TO /API/MODELS
helpers.handleDelete = function (model, searchObject, callback) {
  console.log('DB deleting: ', model);
  console.log('searchObject: ', searchObject );
  models[model].find(searchObject).remove(function(err, result){
    if (err) {
      console.log('DB error in delete', err);
    } else {
    console.log('delete successful'); 
    callback(result);
    }
  });
};

// HANDLES POST REQUESTS TO /API/MODELS
helpers.handlePost = function (model, payload, callback) {
  console.log('DB POST api/models CREATING NEW: ', model);
  console.log('payload', payload);
  new models[model](payload).save(function(err,user){
    if (err) {
      console.log('DB error on CREATE: ', err);
    } else {
      console.log('DB success on CREATE');
      callback(user);
    }
  });
};

// HANDLES PUT REQUESTS TO /API/MODELS
helpers.handlePut = function(model, payload, callback){
  console.log('DB PUT api/models Updating', model);
  console.log('payload: ', payload);
  models[model].update(payload.user, {$set: payload.update}, function (err, result){
    if (err) {
      console.log('DB error on UPDATE: ', model);

    } else {
      console.log('DB success on UPDATE: ');
      callback(result);
      
    }
  });
};


// helpers.createUser = function(user, callback) {
//   console.log('-----DB-----');
//   console.log('Creating a user');
//   console.log('user: ', user);
//   console.log('------------');

//   new User({username:user.username, password:user.password, twitterId: user.twitter, admin:user.admin}).save(function(err,user){
//     if ( err ) {
//       console.log('DB: err saving new user ', err);
//     }
//     console.log('DB: saving success', user);
//     callback(user);
//   });
// };

// // targets/handles
// helpers.addTarget = function (handle, interval, res){
//   console.log('IN HELPERS.ADDTARGET :');
//   console.log('handle: ', handle, 'int: ', interval, 'res: ', res);
//   new Target({handle: handle, interval:interval}).save(
//     function(err, target){
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("SUCCES SAVING ", target);
//         Target.find({}).then(function(obj){
//           res.status(200).send(obj);
//         });
//       }
//     });
// };

// // 

// helpers.allTargets = function(res){
//   Target.find({}).then(function(obj){
//     console.log('sending data with response code 200 in DB', obj);
//     res.status(200).send(obj);
//   });
// };

// // messages 
// helpers.addMessage = function (text, res){
//   console.log('IN HELPERS.ADDTARGET :');
//   new Message({text: text}).save(
//     function(err, target){
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("SUCCES SAVING ", target);
//         Message.find({}).then(function(obj){
//           res.status(200).send(obj);
//         });
//       }
//     });
// };


// // hash tag 
// helpers.addHashTag = function (hashTag, res){
//   console.log('IN HELPERS.addHashTag:');
//   console.log('hashtag',hashTag);
//   new HashTag({text:hashTag}).save(
//     function(err, target){
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("SUCCES SAVING ", hashTag);
//         HashTag.find({}).then(function(obj){
//           res.status(200).send(obj);
//         });
//       }
//     });
// };

console.log('db is feeling good');
module.exports = {
  Target: Target,
  Message: Message,
  HashTag: HashTag,
  helpers:helpers,
};


