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
  'post /api/login'                     : 'api/AuthController.login',
  'get /api/logout'                     : 'api/AuthController.logout',

  // Posts
  'get /api/posts/:page?'               : 'api/PostController.index',
  'get /api/posts/search/:query/:page?' : 'api/PostController.search',
  'get /api/post/:id?'                  : 'api/PostController.show',
  'post /api/post'                      : 'api/PostController.create',
  'put /api/post/:id'                   : 'api/PostController.update',
  'delete /api/post/:id'                : 'api/PostController.destroy',

  // Upload
  'post /api/upload/'                   : 'api/UploadController'
};