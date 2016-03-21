var passport = require('passport');
var TwitterStrategy = require('passport-twitter');

var User = require('../server/db.js').User;

passport.serializeUser(function(id, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



// Sign in with Twitter


passport.use(new TwitterStrategy({
  consumerKey:
}))
