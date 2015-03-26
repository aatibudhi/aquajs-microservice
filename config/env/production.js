/**
 * Sample production configuration file
 *
 * NOTE: This file will be rewritten when `aqua scaffold` is executed
 *
 * Exports app name, and log config for production environment
 */

var path = require('path');

module.exports = {
  app: {
    name: 'sample',
    logconfpath: path.join($dirPaths.configDir, 'env/production_log_config.json'),
  }
};