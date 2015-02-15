var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    config = require('./config'),
    logger = require('./logger'),
    express = require('express'),
    morgan = require('morgan'), 
    compression = require('compression'), 
    bodyParser = require('body-parser'), 
    methodOverride = require('method-override'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    passport = require('passport'),
    flash = require('connect-flash'),
    path = require('path');


module.exports = function (db) {
    //Initialize express
    var app = express();
    
    // Globbing model files
    config.getGlobbedFiles('./app/models/**/*.js').forEach(function (modelPath) {
        require(path.resolve(modelPath));
    });
    
    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();
    
    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });
    
    // Should be placed before express.static
    app.use(compression({
        // only compress files for the following content types
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // zlib option for compression level
        level: 3
    }));
    
    // Showing stack errors
    app.set('showStackError', true);
    
    // Enable logger (morgan)
    app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');
    

    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config .sessionSecret,
        store: new mongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        }),
        cookie: config.sessionCookie,
        name: config.sessionName
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());
    
    // connect flash for flash messages
    app.use(flash());

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    app.use(express.static('./public'));
    
    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();
        
        // Log it
        console.error(err.stack);
        
        // Error page
        //res.status(500).render('500', {
        //    error: err.stack
        //});
    });
    
    // Assume 404 since no middleware responded
    //app.use(function (req, res) {
    //    res.status(404).render('404', {
    //        url: req.originalUrl,
    //        error: 'Not Found'
    //    });
    //});
    
    if (process.env.NODE_ENV === 'secure') {
        // Load SSL key and certificate
        var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
        var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');
        
        // Create HTTPS Server
        var httpsServer = https.createServer({
            key: privateKey,
            cert: certificate
        }, app);
        
        // Return HTTPS server instance
        return httpsServer;
    }

    return app;
};

