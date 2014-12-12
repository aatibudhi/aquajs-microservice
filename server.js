GLOBAL.dirPaths = require(process.cwd() + '/server/config/dirPaths');

var config = require(dirPaths.configDir + 'config');

// Bootstrap app with Models, Dependencies, Routes configuration
GLOBAL.app = require(dirPaths.configDir + 'system/bootstrap')(config);

var logger = require('aquajs-logger').getLogger();

// Process uncaught Exception Before Exiting the program
process.on('uncaughtException', function(err) {
  console.error('An uncaughtException was found, the program will end.');
  console.error(err);
  process.exit(1);
});

var server = app.listen(config.port, function() {
  logger.info("microservice listing on port:" + server.address().port);
});

