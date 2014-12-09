/**
 * Created by verangasamy on 7/29/14.
 */


var express = require('express'),
    fs = require('fs'),
    AquaJsLogger = require('aquajs-logger'),
    swagger = require("swagger-express"),
    chai = require("chai"),
    async = require("async"),
    Waterline = require('waterline');



module.exports = function (config) {
    var app = express()

//Setup the Express related properties
    require('../express')(app)
    //init logger property
    initLogger(config.app.logconfpath);
    initORM(config.enableWaterline,config.enablePersist,config.app.dbConfList,app);

//Swagger related properties will get initialized based on the apiServer flag
    initSwagger(app);

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
    var scheduler = require('aquajs-scheduler');
    scheduler.init(config, cronMethods);
    scheduler.enableSchedulerUI(app);
    scheduler.schedule();

}

function initLogger(logpath) {
    var logJsonConfig = require(logpath);
    AquaJsLogger.init(logJsonConfig);
}

function initSwagger(app) {

    // Serve up swagger ui at /swagger via static route
    var docs_handler = express.static(path.join(__dirname,'..','..','..','node_modules','aquajs-swagger-ui','dist'));
    var setSwaggerContext = true;
    var pathList = [];

    var list = fs.readdirSync(dirPaths.serverDir + 'schema')
    list.forEach(function (file) {
        pathList.push(dirPaths.serverDir + 'schema/' + file);
    });
	app.get(/^\/apidoc(\/.*)?$/, function (req, res, next) {
            if (setSwaggerContext) {
                var urlPath = req.protocol + "://" + req.get('host');
                app.use(swagger.init(app, {
                    apiVersion: '1.0',
                    swaggerVersion: '1.0',
                    basePath: urlPath,
                    swaggerURL: '/swagger',
                    swaggerJSON: '/api-docs.json',
                    swaggerUI: path.join(__dirname,'..','..','..','node_modules','@aqua','aquajs-swagger-ui','dist'),
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
}
function initORM(enableWaterline,enablePersist,dbConfList,app){

    async.each(dbConfList, function(eachConfig, callback) {
        if(enableWaterline){
            var orm = new Waterline();
            var models_path = dirPaths.serverDir + 'models';
            fs.readdirSync(models_path).forEach(function (file) {
                var newPath = models_path + '/' + file
                var stat = fs.statSync(newPath);
                if (stat.isFile()) {
                    try {
                       orm.loadCollection(require(newPath));
                    }
                    catch(ex){
                        console.log(ex);
                    }
                }
            });
            orm.initialize(eachConfig, function(err, models) {
                try{
                    app.models = models.collections;
                    app.connections = models.connections;
                }catch(e){
                    console.error("please start the monogdb before starting the aquajs server");
                    process.exit(1);
                }

            });
        }
        if(enablePersist){
            //code for persist model initialization
        }
        callback('finished the model initialization');
    }, function(err){
        if( err ) {
            console.log('A file failed to process');
        } else {
            console.log('All files have been processed successfully');
        }
    });
}


