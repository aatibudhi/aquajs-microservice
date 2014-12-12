/**
 * Aqua JS Framework build on top of the express
 * Minimal Express initialization routing and env configuration files initialization
 * Middle wire wirging using app.use like body parase compression cookie parser
 */

'use strict'
var express = require('express'),
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


module.exports = function(app) {

  // false for all environments except development
  app.set('showStackError', false);

  // Prettify HTML
  app.locals.pretty = true;

  // cache=memory or swig dies in NODE_ENV=production
  if (process.env.NODE_ENV == 'production') {
    app.locals.cache = 'memory';
  }

  // Should come before express.static (if used) to ensure content is compressed
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // levels 0-9, where 0 = no compression (fastest) and 9 = best compression (slowest)
    level: 9
  }));

  if (process.env.NODE_ENV === 'development') {
    app.set('showStackError', true);
    app.use(morgan('dev'));
  }

  app.enable('jsonp callback');

  // Should come before session (if used)
  app.use(cookieParser());

  // Request body parsing middleware should be above method-override
  // https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
  // extended: true means use qs for parsing
  // https://www.npmjs.com/package/qs
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(require('method-override')())

  // Dynamic helpers
  app.use(helpers(config.app.name));

  // Routes should be last
  bootstrapRoutes(app);

  //initializing the routes from the server/routes folder
  function bootstrapRoutes(app) {
    var routes_path = path.join(appPath, 'server', 'routes');
    if (fs.existsSync(routes_path)) {
      var walk = function(routes_path) {
        fs.readdirSync(routes_path).forEach(function(file) {
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