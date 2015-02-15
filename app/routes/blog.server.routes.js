module.exports = function (app) {
    var blog = require('../controllers/blog.server.controller'),
        users = require('../../app/controllers/users.server.controller');

    app.route('/blogs')
        .get(blog.list);
    
    app.route('/blogs/create')
		.post(users.requiresLogin, blog.createBlog);

    app.route('/blogs/edit/:slug')
		.post(users.requiresLogin, blog.getBlog);

    app.route('/blogs/:slug')
		.get(blog.getBlog)
        .put(users.requiresLogin, blog.hasAuthorization, blog.update)
        .delete(users.requiresLogin, blog.hasAuthorization, blog.delete);

    app.param('slug', blog.getBlogBySlug);
};

