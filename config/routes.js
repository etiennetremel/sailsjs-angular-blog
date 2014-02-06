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
  'post /api/login'                     : 'AuthController.login',
  'get /api/logout'                     : 'AuthController.logout',

  // Posts
  'get /api/posts/:page?'               : 'PostController.index',
  'get /api/posts/search/:query/:page?' : 'PostController.search',
  'get /api/post/:id?'                  : 'PostController.show',
  'post /api/post'                      : 'PostController.create',
  'put /api/post/:id'                   : 'PostController.update',
  'delete /api/post/:id'                : 'PostController.destroy',

  // Upload
  'post /api/upload/'                   : 'UploadController'
};