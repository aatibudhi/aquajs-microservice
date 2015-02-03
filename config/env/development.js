/**
 * Created by verangasamy on 7/29/14.
 * development configuration file
 * pass the database configuration, app name ,
 * log config and scheduler config and other boolean flags for production env
 * We also provide the database initialization configuration for waterline and persist
 *
 */
var path = require('path');

var wDBConf = {
  adapters: {
        'default': require('sails-mongo'),
        mongo: require('sails-mongo')
    },
    connections: {
        mongo: {
            adapter: 'mongo',
            module: 'sails-mongo',
            host: 'localhost',
            port: 27017,
            database: 'ramp'
        }
    }
};

var persistConf = {
    "driver": "oracle",
  "name": "testConn",
  "hostname": "eceedevdb01.sv2.corp.equinix.com",
  "user": "ecee_int",
  "password": "welcome1",
  "port": "1521",
  "database": "ECEEDEV1",
  "pooling": {
      "name": "ecxPool",
      "max": 2,
      "min": 1,
      "idleTimeoutMillis": 30000
  }
};

module.exports = {
    app: {
        name: 'aqua',
		loadModel : true,
        logconfpath: path.join($dirPaths.configDir, 'env/log_config.json'),
        schedulerconfpath: path.join($dirPaths.configDir, 'env/scheduler-conf.json'),
        ormList:['waterline','persist'],
        dbConfList:[wDBConf,persistConf]
    }
};