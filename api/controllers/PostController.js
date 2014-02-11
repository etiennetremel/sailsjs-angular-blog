/**
 * Post Controller
 */

var PostController = {

  index: function (req,res) {
    var page = req.param('page') || 1,
        postsPerPage = 10,
        opts = {};

    // If search
    if (req.param('query')) {
      opts = { or: [] };

      var query = req.param('query').split(' ');
      _.each(query, function (q) {
        opts.or.push({
          title: {
            contains: q
          }
        });

        opts.or.push({
          content: {
            contains: q
          }
        });
      });
    }

    Post.find(opts).done(function (err, posts) {
      if (err) return res.serverError(err);
      var totalPosts = posts.length;

      Post.find(opts)
        .sort('createdAt DESC')
        .paginate({page: page, limit: postsPerPage})
        .done(function (err, posts) {
          res.send({
            totalPosts: totalPosts,
            perPage: postsPerPage,
            currentPage: parseInt(page),
            posts: posts
          })
        });
    });
  },

  // category: function (req, res) {
  //   var category = req.param('category');

  //   Post.findByCategoriesIn(category).done(function (err, posts) {
  //     if (err) { return res.view('index', {posts: {}, category: ''}); }
  //     return res.view({posts: posts, category: category});
  //   });
  // },

  // tag: function (req,res) {
  //   var tag = req.param('tag');

  //   Post.findByTagsIn(tag).done(function (err, posts) {
  //     if (err) { return res.view('index', {posts: {}, tag: ''}); }
  //     return res.view({posts: posts, tag: tag});
  //   });
  // },

  show: function (req, res) {
    Post.findOne(req.param('id')).done(function (err, post) {
      if (err) return res.serverError(err);
      res.send(post);
    });
  },

  create: function(req, res) {
    Post.create({
      title: req.param('title'),
      slug: req.param('slug'),
      content: req.param('content'),
      tags: req.param('tags'),
      categories: req.param('categories')
    }).done(function(err, post) {
      if (err) return res.serverError(err);
      res.send(post);
    });
  },

  update: function(req, res) {
    console.log('updating');
    Post.update({
      id: req.param('id')
    },{
      title: req.param('title'),
      slug: req.param('slug'),
      content: req.param('content'),
      tags: req.param('tags'),
      categories: req.param('categories')
    }, function(err, post) {
      console.log(err);
      if (err) res.serverError(err);
      res.send(post);
    });
  },

  destroy: function(req, res) {
    Post.destroy(req.param('id')).done(function(err) {
      if (err) return res.serverError(err);
      res.send({});
    });
  }
};

module.exports = PostController;