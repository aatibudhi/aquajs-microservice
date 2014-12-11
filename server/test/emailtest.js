var assert = require('assert'),
  email = require('../lib/email'),
  path = require('path'),
  templatePath = path.join(process.cwd(), 'server/templates/email'),
  fs = require('fs'),
  renderedPath = path.join(__dirname, 'rendered-templates'),
  loggerConfig = require('../config/env/log_config.json'),
  logger = require('aquajs-logger'),
  log;


before(function () {
  // init logging
  logger.init(loggerConfig);
  log = logger.getLogger();

  email.setTemplatePath(templatePath);
});


describe('basic email template tests', function () {


  it('should generate a formatted template', function (done) {
    var data = {name: 'Uma'};

    email.render('welcome', data, function (err, message) {
      assert.ifError(err);

      var expectedFile = path.join(renderedPath, 'welcome.html');
      var contents = fs.readFileSync(expectedFile, {encoding: 'utf-8'});

      // strip carriage returns from CRLFs, only want newlines
      contents = contents.replace(/(\r)/gm, '');
      assert.equal(message, contents);
      done();

    });

  });

});


describe('send email tests', function () {

  this.timeout(5 * 1000);

  it('should send email with successful status', function (done) {
    var templateContext = {
      name: 'Uma'
    };

    var mailContext = {
      from: 'Uma More <me@sandboxc83f6a95ec1f4b0d97d66e391dbe6d9c.mailgun.org>',
      to: 'u.r.surve@gmail.com',
      subject: 'Hello',
      format: 'html'
    };

    log.info('[emailtest] sending a test email');

    email.send('welcome', templateContext, mailContext, function (err, success) {
      assert.ifError(err);
      assert(success);
      done(err);
    });

  });

});

