/**
 * User Controller
 */

var passport = require('passport');

var UserController = {

  me: function (req, res) {
    if (!req.user) return res.send(401);
    return res.send(req.user);
  },

  logout: function (req, res) {
    req.logout();

    return res.send({
      status: 'success'
    });
  },

  login: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if (err) return res.serverError(err);
      if (!user) return res.serverError('Authentification failed. Combination username/password incorrect?');

      req.logIn(user, function(err) {
        if (err) res.serverError(err);

        return res.send({
          status: 'success',
          user: user
        });
      });
    })(req, res);
  }
};

module.exports = UserController;