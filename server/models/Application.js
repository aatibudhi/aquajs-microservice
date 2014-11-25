var Waterline = require('waterline');
var Application = Waterline.Collection.extend({
  adapter: 'mongo',
  connection: 'mongo',
  schema: false,
  identity: 'application',
  attributes: {
    appName: {
      type: 'String'
    },
    appId: {
      type: 'String'
    },
    appSecret: {
      type: 'String'
    },
    logAttributes: {
      type: 'json'
    },
    ownerAttributes: {
      type: 'json'
    },
    version: {
      type: 'String'
    }
  }
});

module.exports = Application;