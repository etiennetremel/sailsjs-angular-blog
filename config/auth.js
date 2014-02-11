var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
  User.findOne({uid: uid}).done(function (err, user) {
    done(err, user)
  });
});

module.exports = {
  express: {
    customMiddleware: function (app) {
      passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }

          bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) return done(err);
            if(isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid password' });
            }
          });
        });
      }));

      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};