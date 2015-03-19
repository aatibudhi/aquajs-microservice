/**
 * Created by verangasamy on 7/29/14.
 * production configuration file
 * pass the database configuration, app name ,
 * log config and scheduler config and other boolean flags for production env
 */

var path = require('path');

module.exports = {
  app: {
    name: '{{projectName}}',
    logconfpath: path.join($dirPaths.configDir, 'env/production_log_config.json')
  }
};