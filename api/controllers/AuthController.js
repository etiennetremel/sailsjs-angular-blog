/**
 * Auth Controller
 */

var passport = require('passport');

var AuthController = {
  logout: function (req, res) {
    req.logout();

    return res.json({
      status: 'success'
    });
  },

  login: function (req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }

      if (!user) {
        return res.json({
          status: 'error',
          flash: 'The sign in attempt was not successful.'
        });
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({
          status: 'success'
        });
      });
    })(req, res);
  }
};

module.exports = AuthController;