/**
 * User Model
 */

var bcrypt = require('bcrypt');

var User = {

  attributes: {
    uid: {
      type: 'integer',
      index: true
    },
    username: {
      type: 'string',
      index: true,
      required: true
    },
    email: {
      type: 'string',
      email: true,
      index: true,
      required: true
    },
    password: {
      type: 'string',
      // alphanumeric: true,
      // minLength: 6,
      required: true
    },
    fistname: 'string',
    lastname: 'string'
  },

  beforeCreate: function(values, next) {

    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }
};

module.exports = User;