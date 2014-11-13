/**
 * Created by verangasamy on 7/29/14.
 * development configuration file
 * pass the database configuration, app name ,
 * log config and scheduler config and other boolean flags for production env
 * We also provide the database initialization configuration for waterline and persist
 *
 */
'use strict';
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
module.exports = {
    app: {
        name: 'aqua',
        logconfpath: dirPaths.configDir + 'env/log_config.json',
        schedulerconfpath: dirPaths.configDir + 'env/scheduler-conf.json',
        ormList:['waterline','persist'],
        dbConfList:[wDBConf]
    }
};
