var
  path = require('path'),
  swig = require('swig'),
  templatePath = '.',
  api_key = 'key-c02f846994b43bd479849ad8132a5b82',
  domain = 'sandboxc83f6a95ec1f4b0d97d66e391dbe6d9c.mailgun.org',
  mailgun = require('mailgun-js')({apiKey: api_key, domain: domain}),
  loggerConfig = require('../config/env/log_config.json'),
  logger = require('aquajs-logger'),
  log;

logger.init(loggerConfig);
log = logger.getLogger();

module.exports = {
  setTemplatePath: setTemplatePath,
  render: render,
  send: send
};


function setTemplatePath(path) {
  templatePath = path;
}


function render(template, data, callback) {
  swig.renderFile(getPath(template), data, callback);
}


function send(template, data, mail, callback) {
  render(template, data, function (err, message) {
    if (err) return callback(err);

    if (mail.format == 'text') {
      mail.text = message;
    } else {
      mail.html = message;
    }

    mailgun.messages().send(mail, function (err, body) {
      if (err) {
        log.info('error sending message to: %s (error: %s, statusCode: %s', mail.to, err.message, err.statusCode);
        return callback(err);
      }

      // a successful response body looks like this:
      // {
      //   message: 'Queued. Thank you.',
      //   id:      '<20141209220440.10195.48452@sandboxc83f6a95ec1f4b0d97d66e391dbe6d9c.mailgun.org>'
      // }

      var success = /^[Qq]ueued/.test(body.message);
      callback(null, success);
    });
  });
}


function getPath(template) {
  return path.join(templatePath, template) + '.html';
}

