var path = require('path');

GLOBAL.$dirPaths = require(process.cwd() + '/server/config/dirPaths');
GLOBAL.$config = require(path.join($dirPaths.configDir, 'config'));
GLOBAL.$app = require('./server/config/system/bootstrap')($config);
GLOBAL.$logger = require('aquajs-logger').getLogger();


var server = $app.listen($config.port, function() {
  $logger.info("[microservice] listing on port:" + server.address().port);
});

