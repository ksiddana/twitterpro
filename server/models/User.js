var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  twitterId: String,
  admin: Number
});

var User = mongoose.model('User', UserSchema);
