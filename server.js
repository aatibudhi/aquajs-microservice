GLOBAL.dirPaths = require(process.cwd() + '/server/config/dirPaths');

var config = require(dirPaths.configDir + 'config');

// Bootstrap app with Models, Dependencies, Routes configuration
GLOBAL.app = require(dirPaths.configDir + 'system/bootstrap')(config);

var logger = require('aquajs-logger').getLogger();

var server = app.listen(config.port, function() {
  logger.info("microservice listing on port:" + server.address().port);
});

