/**
 * Created by verangasamy on 7/29/14.
 */


var express = require('express'),
    fs = require('fs'),
    AquaJsLogger = require('@aqua/aquajs-logger'),
    swagger = require("swagger-express"),
    chai = require("chai"),
    async = require("async");



module.exports = function (config) {
    var app = express()

    function bootstrapModels() {
        var models_path = dirPaths.serverDir + 'models';
            var walk = function (models_path) {
                fs.readdirSync(models_path).forEach(function (file) {
                    var newPath = models_path + '/' + file
                    var stat = fs.statSync(newPath);
                    if (stat.isFile()) {
                        if (/(.*)\.(js$|coffee$)/.test(file)) {
                            require(newPath);
                        }
                    } else if (stat.isDirectory()) {
                        walk(newPath);
                    }
                });
            };
            walk(models_path);
    }

    bootstrapModels();

//Setup the Express related properties
    require('../express')(app)
    //init logger property
    initLogger(config.app.logconfpath);

//Swagger related properties will get initialized based on the apiServer flag
    if ("true" == config.apiServer) {
        //init chai test case variables
        global.expect = chai.expect;
        global.AssertionError = chai.AssertionError;
        global.Assertion = chai.Assertion;
        global.assert = chai.assert;

        //init swagger
        //initSwagger(app);
    }

//Batch process related properties will get initialized based on the batchProcessServer
    if ("true" == config.batchProcessServer) {
        //init the scheduler
        initScheduler(config.app.schedulerconfpath, app);
    }

    return app;
}

function initScheduler(schedulerconfpath, app) {
    var cronMethods = require(serverDir + 'aquajs-cli/scheduler/cron-methods.js');
    var config = require(schedulerconfpath);
    var scheduler = require('@aqua/aquajs-scheduler');
    scheduler.init(config, cronMethods);
    scheduler.enableSchedulerUI(app);
    scheduler.schedule();

}

function initLogger(logpath) {
    var logJsonConfig = require(logpath);
    AquaJsLogger.init(logJsonConfig);
}

function initSwagger(app) {
    var templateGen = require( 'templateGen');
    // Serve up swagger ui at /swagger via static route
    var docs_handler = express.static(nodeModulesDir + 'swagger-ui/dist');
    var setSwaggerContext = true;
    var pathList = [];

    var list = fs.readdirSync(serverDir + 'schema')
    list.forEach(function (file) {
        pathList.push(serverDir + 'schema/' + file);
    });

    async.parallel([
        function(callback) {
            templateGen.genControllers(pathList, function(err) {
                callback();
            });
        },

        function(callback) {
            templateGen.genModels(pathList, modelsDir, function(err) {
                callback();
            });
        },

        function(callback) {
            templateGen.genControllerTestCases (pathList, modelsDir, function(err) {
                callback();
            });
        }

    ], function(err) {

        app.get(/^\/apidoc(\/.*)?$/, function (req, res, next) {
            if (setSwaggerContext) {
                var urlPath = req.protocol + "://" + req.get('host');
                app.use(swagger.init(app, {
                    apiVersion: '2.0',
                    swaggerVersion: '2.0',
                    basePath: urlPath,
                    swaggerURL: '/swagger',
                    swaggerJSON: '/api-docs.json',
                    swaggerUI: nodeModulesDir + 'swagger-ui/dist/',
                    apis: pathList
                }));
                // Configures the app's base path and api version.
                setSwaggerContext = false;
            }
            if (req.url === '/apidoc') { // express static barfs on root url w/o trailing slash
                res.writeHead(302, {'Location': req.url + '/'});
                res.end();
                return;
            }

            // take off leading /docs so that connect locates file correctly
            req.url = req.url.substr('/apidoc'.length);
            return docs_handler(req, res, next);

        });

    });
}

