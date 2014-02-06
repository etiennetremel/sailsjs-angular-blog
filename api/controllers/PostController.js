/**
 * Post Controller
 */

var PostController = {

  index: function (req,res) {
    var page = req.param('page') || 1,
        postsPerPage = 10;

    Post.find().done(function (err, posts) {
      if (err) return res.send(err, 500);
      var totalPosts = posts.length;

      Post.find()
        .sort('createdAt DESC')
        .paginate({page: page, limit: postsPerPage})
        .done(function (err, posts) {
          res.json({
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

  search: function (req,res) {
    var page = req.param('page') || 1,
        query = req.param('query') || '',
        postsPerPage = 2,
        opts = { or: [] };

    query = query.split(' ');
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

    Post.find(opts).done(function (err, posts) {
      if (err) return res.send(err, 500);
      var totalPosts = posts.length;

      Post.find(opts)
        .sort('createdAt DESC')
        .paginate({page: page, limit: postsPerPage})
        .done(function (err, posts) {
          res.json({
            totalPosts: totalPosts,
            perPage: postsPerPage,
            currentPage: parseInt(page),
            posts: posts
          })
        });
    });
  },

  show: function (req, res) {
    var id = req.param('id');
    Post.findOne(id).done(function (err, post) {
      if (err) return res.send(err, 500);
      res.json(post);
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
      if (err) return res.send(err, 500);
      res.json(post);
    });
  },

  update: function(req, res) {
    Post.update({
      id: req.param('id')
    },{
      title: req.param('title'),
      slug: req.param('slug'),
      content: req.param('content'),
      tags: req.param('tags'),
      categories: req.param('categories')
    }, function(err, post) {
      if (err) return res.send(err, 500);
      res.json(post);
    });
  },

  destroy: function(req, res) {
    Post.destroy(req.param('id')).done(function(err) {
      if (err) return res.send(err, 500);
      res.json({});
    });
  }
};

module.exports = PostController;