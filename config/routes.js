/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

  // Default view
  '/'                                   : 'views/layout.ejs',

  // Auth
  'get /api/users/me'                   : 'UserController.me',
  'post /api/users/login'               : 'UserController.login',
  'get /api/users/logout'               : 'UserController.logout',

  // Posts
  'get /api/posts'                      : 'PostController.index',
  'get /api/posts/:id'                  : 'PostController.show',
  'post /api/posts'                     : 'PostController.create',
  'put /api/posts/:id'                  : 'PostController.update',
  'delete /api/posts/:id'               : 'PostController.destroy',

  // Upload
  'post /api/upload'                    : 'UploadController.index'
};