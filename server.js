'use strict';
/**
 * Created by verangasamy on 7/29/14.
 * Microservice follows the Scale Cube (specifically y-axis scaling) pattern and  functionally
 * decompose the application into a set of collaborating services. Each service implements a set of narrowly,
 * related functions. For example, an application might consist of services such as the order management service,
 * the customer management service etc.
 * Service communicate using either synchronous protocols such as HTTP/REST and run in different ports .
 * Services are developed and deployed independently of one another.
 */

//Export Global Path Object

GLOBAL.dirPaths = require( process.cwd()+'/server/config/dirPaths');

//require all the path variables

var path = require('path'),
    express = require('express'),
    aqua = require('@aqua/aquajs'),
    http = require('http'),
    bodyParser = require('body-parser'),
    url = require("url"),
    domain = require('domain'),

// Initializing system variables
    config = require(dirPaths.configDir + 'config');
// Bootstrap Models, Dependencies, Routes and the app as an express app
    global.app = require(dirPaths.configDir + 'system/bootstrap')(config);

//Load NPM modules to memory using dependable's
     var aqua = aqua.app('aquajs'),
//initialize the logger
     logger = require('@aqua/aquajs-logger').getLogger();



//Process uncaught Exception Before Exiting the program
process.on('uncaughtException', function (err) {
    console.error('An uncaughtException was found, the program will end.');
    process.exit(1);
});

app.listen(config.port);

logger.info("Server Listing on the port:" + config.port);

