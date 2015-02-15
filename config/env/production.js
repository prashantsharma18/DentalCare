
module.exports = {
    db: {
        uri: 'mongodb://prashantsharma18:bond999@ds043971.mongolab.com:43971/dental-care',
        options: {
            user: '',
            pass: ''
        }
    },
    log: {
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'combined',
        // Stream defaults to process.stdout
        // Uncomment to enable logging to a log on the file system
        options: {
            stream: 'access.log'
        }
    },
    assets: {
        lib: {
            css: [
                'public/vendor/bootstrap-css-only/css/bootstrap.min.css',
                'public/vendor/components-font-awesome/css/font-awesome.min.css'
            ],
            js: [
                'public/vendor/angular/angular.min.js',
                'public/vendor/angular-resource/angular-resource.min.js',
                'public/vendor/angular-ui-router/release/angular-ui-router.min.js',
                'public/vendor/angular-utils-disqus/dirDisqus.js',
                'public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'public/vendor/textAngular/dist/textAngular-sanitize.min.js',
                'public/vendor/textAngular/dist/textAngular.min.js'
            ]
        },
        css: [
            'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ]
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || '338827686304451',
        clientSecret: process.env.FACEBOOK_SECRET || 'dc2cdb3810ec59cd139e90bb0ea67b12',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
        clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
        callbackURL: '/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'APP_ID',
        clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
        callbackURL: '/auth/google/callback'
    },
    linkedin: {
        clientID: process.env.LINKEDIN_ID || 'APP_ID',
        clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
        callbackURL: '/auth/linkedin/callback'
    },
    github: {
        clientID: process.env.GITHUB_ID || 'APP_ID',
        clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
        callbackURL: '/auth/github/callback'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
            }
        }
    }
};
