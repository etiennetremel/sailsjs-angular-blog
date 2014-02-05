/**
 * Post Model
 */

var Post = {

  adapter: 'mongo',

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    slug: 'string',
    content: {
      type: 'text',
      required: true
    },
    tags: 'array',
    categories: 'array'
  },

  afterValidation: function (values, next) {
    // Generate and sanitanize slug
    if (values.slug === null || values.slug === '') {
      values.slug = values.title;
    }
    values.slug = values.slug.toLowerCase().replace(/\s+/, '-');

    next();
  }
};

module.exports = Post;