var aquajs = require('aquajs'),
    bootstrap = aquajs.bootstrap,
    config = require('./server/config/config');


// bootstrap is responsible for setting up the entire environment,
// including several globals ($dirPaths, $config, $logger, and $app)
var app = bootstrap(config);

var server = app.listen($config.port, function() {
  $logger.info("[microservice] listing on port:" + server.address().port);
});

