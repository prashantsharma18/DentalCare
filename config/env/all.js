
module.exports = {
    app: {
        title: 'Dental Care',
        description: 'Dental Care',
        keywords: 'Dental'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'ejs',
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'dental-care',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'dentalcaresessions',
    // The session cookie settings
    sessionCookie: {
        path: '/',
        httpOnly: true,
        // If secure is set to true then it will cause the cookie to be set
        // only when SSL-enabled (HTTPS) is used, and otherwise it won't
        // set a cookie. 'true' is recommended yet it requires the above
        // mentioned pre-requisite.
        secure: false,
        // Only set the maxAge to null if the cookie shouldn't be expired
        // at all. The cookie will expunge when the browser is closed.
        maxAge: null,
		// To set the cookie in a specific domain uncomment the following 
		// setting:
		// domain: 'yourdomain.com'
    },
    // The session cookie name
    sessionName: 'connect.sid',
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
    }
};