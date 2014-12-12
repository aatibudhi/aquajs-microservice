
/**
 * Aqua JS Framework build on top of the express
 * Minimal Express initialization routing and env configuration files initialization
 * Middle wire wirging using app.use like body parase compression cookie parser
 */

'use strict'
var express = require('express'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config'),
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    morgan = require('morgan'),
    appPath = process.cwd(),
    bodyParser = require('body-parser'),
    fs = require('fs');

/**
 * Middle wire component initialization using app.use
 * @api public
 * @param app
 * @param db
 * @see
 * @return
 */


module.exports = function (app, db) {

    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;

    // cache=memory or swig dies in NODE_ENV=production
    if (process.env.NODE_ENV == 'production') {
        app.locals.cache = 'memory';
    }

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride

    app.use(bodyParser.json());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    //For express form validator
    app.use(expressValidator());

    app.use(require('method-override')())

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Connect flash for flash messages
    app.use(flash());

    // Routes should be at the last
    bootstrapRoutes(app);

    //initializing the routes from the server/routes folder
    function bootstrapRoutes(app) {
        var routes_path = path.join(appPath, 'server','routes');
        if(fs.existsSync(routes_path)) {
            var walk = function (routes_path) {
                fs.readdirSync(routes_path).forEach(function (file) {
                    var newPath = routes_path + '/' + file;
                    var stat = fs.statSync(newPath);
                    if (stat.isFile()) {
                        if (/(.*)\.(js$|coffee$)/.test(file)) {
                            require(newPath)(app);
                        }
                        // We skip the app/routes/middlewares directory as it is meant to be
                        // used and shared by routes as further middlewares and is not a
                        // route by itself
                    } else if (stat.isDirectory() && file !== 'middlewares') {
                        walk(newPath);
                    }
                });
            };
            walk(routes_path);
        }
    }
}