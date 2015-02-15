
var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    Tag = mongoose.model('Tag'),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash'),
   async = require('async');

 exports.list = function (req, res) {
        Blog.find().sort('-postedDt').populate('user', 'displayName').exec(function (err, blogs) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(blogs);
            }
        });
};


exports.getBlogBySlug = function (req, res, next, slug) {
    console.log('getBlogBySlug');
    Blog.findOne({ slug: slug })
    .populate('user', 'displayName')
    .populate({path: 'tags', select: 'title _id'})
    .exec(function (err, blog) {
        if (err) return next(err);
        if (!blog) return next(new Error('Failed to load blog ' + slug));
        req.blog = blog;
        next();
    });
};

exports.getBlog = function (req, res) {
    console.log('getBlog');
    res.json(req.blog);
};

exports.createBlog = function (req, res, next) {
    //save tags present in request body and get the object ids to be save in blog object. 
    var tagcoll = req.body.tags;
    var tagIds = [];
    async.eachSeries(tagcoll, function (item, callback) {

        Tag.findOne({ title: item }, { title: 0 }).exec(function (err, tag) {  
            if (err) callback(err);
            if (!tag) {                                  //if not able to find the tag then create it
                var newtag = new Tag({ title: item });
                newtag.save(function (err, tag) {
                    tagIds.push(tag._id);
                    callback(null);
                });
            }
            else {
                tagIds.push(tag._id);
                callback(null);
            }

        });
    }, 
    function (err) {
        if (err) return next(err);

        req.body.tags = tagIds;
        var blog = new Blog(req.body);
        blog.user = req.user;
        blog.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(blog);
            }
        });
    });
    
};

exports.update = function (req, res) {    
    //First delete the tags and then save it
    var tags = req.blog.tags;

    var blog = req.blog;
    
    blog = _.extend(blog, req.body);
    
    blog.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(blog);
        }
    });
};

exports.delete = function (req, res) {
    var blog = req.blog;
    
    blog.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(blog);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.blog.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};