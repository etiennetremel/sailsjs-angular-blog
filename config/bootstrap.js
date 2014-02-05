/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  User.findOne({username: 'admin'}).done(function (err, user) {
    if (user) {
      console.log('Default user already existing');
    } else {

      // Create user if not in DB
      User.create({
        uid: 1,
        username: 'admin',
        fistname: '',
        lastname: '',
        password: 'admin',
        email: 'admin@example.com'
      }).done(function(err, user) {
        if (err) {
          return console.log(err);
        } else {
          console.log("User created:", user);
        }
      });
    }
  });

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};