/**
 * Universal configuration for all environments
 *
 * Exports boolean flag settings like enabling the batch process or to use a template engine or not,
 * as well as monitor and mailer configuration settings.
 * Developer can specify the app level flags as well to enable or disable some functionality.
 */

var path = require('path');

/**
 * Configuration for performance monitor
 * Used to open a web socket for emitting data events to an external listener
 */
var monitorConf = {
  id: '{{projectName}}',
  groupid: '',
  schedule: '*/5 * * * * *',
  eventHost: process.env.MON_HOST || 'localhost',
  eventPort: process.env.MON_PORT || '5555'
};

module.exports = {
  root: process.cwd(),
  port: process.env.PORT || 8090,
  templateEngine: 'swig',
  enableWaterline: true,
  enablePersist: false,
  monitor: monitorConf,
  mailer: require(path.join($dirPaths.configDir, 'mailer', 'email-config.json'))
};
