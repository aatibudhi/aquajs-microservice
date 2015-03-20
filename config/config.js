var _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

process.env.NODE_ENV = ~fs.readdirSync(path.join($dirPaths.configDir, 'env')).map(function(file) {
  return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'local';

// Extend the base configuration in all.js with environment specific configuration
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);