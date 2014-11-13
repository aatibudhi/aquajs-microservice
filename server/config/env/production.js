/**
 * Created by verangasamy on 7/29/14.
 * production configuration file
 * pass the database configuration, app name ,
 * log config and scheduler config and other boolean flags for production env
 *
 */
'use strict';

module.exports = {
    //db: 'mongodb://localhost/aquajs-cli',
    app: {
        name: 'aqua',
        logconfpath: configDir + 'env/log_config.json'
    }

};