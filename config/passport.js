var passport = require('passport'),
    User = require('mongoose').model('User'),
    path = require('path'),
    config = require('./config');

module.exports = function () {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }, '-password -salt', function (err, user) {
            done(err, user);
        });
    });
    
    // Initialize strategies
    config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function (strategy) {
        require(path.resolve(strategy))();
    });
};