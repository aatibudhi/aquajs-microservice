var assert = require('assert');
var request = require('request');
var util = require('util');
var async = require('async');
var baseurl = 'http://localhost:8080';

var statusCodes = require('../server/config/env/error-constants.json');
var coreTests = require('./core-codes-test-driver');

var extendedCodes = require('../server/config/env/extended-error-constants.json');
var extendedTests = require('./extended-codes-test-driver');

// TODO: replace app with actual microsservice app
var app = require('./app');


before(function (done) {
  var server = app.listen('8080', function () {
    console.log('server listening on port %s\n', server.address().port);
    done();

  });
});


function verify(res, constants, message, callback) {
  if (!callback) {
    callback = message;
    message = util.format('expected %s, but actual is %s', constants.status, res.statusCode);
  }

  console.log('verifying HTTP %s%s',
    constants.status,
    constants.code ? ', custom code: ' + constants.code : ''
  );

  assert.equal(res.statusCode, constants.status, message);
  callback();
}





it('should verify all status codes', function (done) {
  var count = coreTests.length;

  async.timesSeries(count, function(i, next) {

    var code = statusCodes[coreTests[i].statusName];
    var constants = {
      status: code.status
    };

    var url = baseurl + '/' + constants.status;

    request(url, function (err, res, body) {
      if (err) return next(err);
      verify(res, constants, next);
    });

  }, function (err) {
    console.log();
    done(err);
  });


});

it('should verify extended codes', function (done) {
  var count = extendedTests.length;

  async.timesSeries(count, function(i, next) {

    var code = extendedCodes[extendedTests[i].statusName];
    var constants = {
      status: code.status,
      code: code.code
    };

    var url = baseurl + '/' + constants.status;

    request(url, function (err, res, body) {
      if (err) return next(err);
      verify(res, constants, next);
    });

  }, function (err) {
    done(err);
  });


});
