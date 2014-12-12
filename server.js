GLOBAL.dirPaths = require(process.cwd() + '/server/config/dirPaths');

var path = require('path'),
    bootstrap = require(path.join(dirPaths.configDir, 'system/bootstrap')),
    config = require(path.join(dirPaths.configDir, 'config'));

GLOBAL.app = bootstrap(config);
GLOBAL.config = config;

var logger = require('aquajs-logger').getLogger();

var server = app.listen(config.port, function() {
  logger.info("[microservice] listing on port:" + server.address().port);
});

