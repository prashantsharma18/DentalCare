var mongoose = require('mongoose'),
crypto = require('crypto'),
Schema = mongoose.Schema;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function (password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    userName: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        trim: true
    },
    password: {
        type: String,
        default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    salt: String,
    provider: {
        type: String,
        required: 'Provider is required !'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: [{
                type: String,
                enum: ['user', 'admin']
            }],
        default: ['user']
    },
    updated: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

//UserSchema.virtual('fullName').get(function () {
//    return this.firstName + ' ' + this.lastName;
//}).set(function (fullName) {
//    var splitName = fullName.split(' ');
//    this.firstName = splitName[0] || '';
//    this.lastName = splitName[1] || '';
//});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/** Static Methods **/
UserSchema.statics.findOneByUsername = function (userName, callback) {
    this.findOne({ userName: new RegExp(userName, 'i') }, callback);
};

UserSchema.statics.findUniqueUsername = function (userName, suffix, callback) {
    var _this = this; var possibleUsername = userName + (suffix || '');
    _this.findOne({ userName: possibleUsername }, function (err, user) {
        if (!err) {
            if (!user) { callback(possibleUsername); } else {
                return _this.findUniqueUsername(userName, (suffix || 0) + 1, callback);
            }
        } else { callback(null); }
    });
};

/** INSTANCE METHODS**/
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};


//UserSchema.set('toJSON', {
//    getters: true, 
//    virtual: true
//});
mongoose.model('User', UserSchema);