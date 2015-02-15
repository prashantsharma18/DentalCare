var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalStrategy({
                usernameField: 'userName',
                passwordField: 'password'
            },
            function (userName, password, done) {
                User.findOne({ userName: userName }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, {
                            message: 'Unknown User !'
                        });
                    }

                    if (!user.authenticate(password)) {
                        return done(null, false, {
                            message: 'Invalid Password !'
                        });
                    }

                    return done(null, user);
                });
    }));
};