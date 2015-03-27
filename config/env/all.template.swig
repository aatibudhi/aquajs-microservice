/**
 * Created by verangasamy on 7/29/14.
 * boolean flag settings like enabling the batch processs or use template engine or not
 * developer  can specify the app level flags as well to enable or disable some functionality
 */

var path = require('path');

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
  connectionType: 'orm-nosql', //'orm-nosql' for mongo-orm and 'orm-sql' for oracle-orm
  monitor: monitorConf,
  mailer: require(path.join($dirPaths.configDir, 'mailer', 'email-config.json'))
};
