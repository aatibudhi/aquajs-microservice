/**
 * Sample UAT configuration file
 *
 * NOTE: This file will be rewritten when `aqua scaffold` is executed
 *
 * Exports the database configuration, app name,
 * log config and scheduler config and other boolean flags for UAT env
 * We also provide the database initialization configuration for waterline and persist
 */

var path = require('path');

var mongoConf = {
  adapters: {
    'default': require('sails-mongo'),
    'mongo-orm': require('sails-mongo')
  },
  connections: {
    mongo: {
      "adapter": "mongo-orm",
      "module": "sails-mongo",
      "host": "localhost",
      "port": 27017,
      "database": "ramp"
    }
  }
};

var persistConf = {
  "driver": "oracle",
  "name": "testConn",
  "hostname": "eceedevdb01.sv2.corp.equinix.com",
  "user": "ecee_int",
  "password": "welcome1",
  "port": 1521,
  "database": "ECEEDEV1",
  "pooling": {
    "name": "ecxPool",
    "max": 2,
    "min": 1,
    "idleTimeoutMillis": 30000
  }
};

var oracleConf = {
  "name": "testConn",
  "log": true,
  "max": 10,
  "hostname": "eceedevdb01.sv2.corp.equinix.com",
  "user": "ecee_int",
  "password": "welcome1",
  "port": 1521,
  "database": "ECEEDEV1"
};

module.exports = {
  app: {
    name: 'sample',
    loadModel: true,
    logconfpath: path.join($dirPaths.configDir, 'env/UAT_log_config.json'),
    schedulerconfpath: path.join($dirPaths.configDir, 'env/scheduler-conf.json'),
    ormList: ['waterline', 'persist'],
    dbConfList: [mongoConf, persistConf, oracleConf]
  }
};