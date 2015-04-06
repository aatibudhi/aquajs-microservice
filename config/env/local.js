/**
 * Created by verangasamy on 7/29/14.
 * development configuration file
 * pass the database configuration, app name ,
 * log config and scheduler config and other boolean flags for production env
 * We also provide the database initialization configuration for waterline and persist
 *
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

var aquaOracleConf = {
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
var mailerConf = {
  "level": "error",
  "to": "aqaujsadmin@equninix.com",
  "from": "aqaujsadmin@equninix.com",
  "host": "",
  "port": "",
  "username": "aqaujsadmin@equninix.com",
  "password": "****",
  "transport": {
    "service": "",
    "auth": {
      "user": "aqaujsadmin@equninix.com",
      "pass": "****"
    }
  }
};

module.exports = {
  app: {
    name: 'sample',
    loadModel: true,
    logconfpath: path.join($dirPaths.configDir, 'env/local_log_config.json'),
    schedulerconfpath: path.join($dirPaths.configDir, 'env/scheduler-conf.json'),
    ormList: ['waterline', 'persist'],
    connectionConfig: {
    {%- for conf in confList -%}
       {{conf}} : {{conf}}{%- if loop.length >1 and !loop.last -%}
        ,
      {%- endif -%}
    {%- endfor -%}
    },
    mailer: require(path.join($dirPaths.configDir, 'email-config.json'))
  }
};