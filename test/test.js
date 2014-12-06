var assert = require('assert');
var request = require('request');
var util = require('util');
var statusCodes = require('../server/config/env/error-constants.json');
var async = require('async');
var baseurl = 'http://localhost:8080';

// TODO: replace app with actual microsservice app
var app = require('./app');


before(function (done) {
  var server = app.listen('8080', function () {
    console.log('server listening on port %s\n', server.address().port);
    done();
  });
});


function verify(res, expected, message, callback) {
  console.log('verifying HTTP ' + expected);

  if (!callback) {
    callback = message;
    message = util.format('expected %s, but actual is %s', expected, res.statusCode);
  }

  assert.equal(res.statusCode, expected, message);
  callback();
}


var tests = [
  {
    testName: '200 test',
    statusName: 'OK'

  },
  {
    testName: '201 test',
    statusName: 'SUCCESS'
  },
  {
    testName: '202 test',
    statusName: 'ACCEPTED'
  },
  {
    testName: '204 test',
    statusName: 'noContent'
  },
  {
    testName: '302 test',
    statusName: 'FOUND'
  },
  {
    testName: '304 test',
    statusName: 'notModified'
  },
  {
    testName: '400 test',
    statusName: 'badRequest'
  },
  {
    testName: '401 test',
    statusName: 'UNAUTHORIZED'
  },
  {
    testName: '403 test',
    statusName: 'FORBIDDEN'
  },
  {
    testName: '404 test',
    statusName: 'invalidRequest'
  },
  {
    testName: '406 test',
    statusName: 'invalidRequest'
  },
  {
    testName: '410 test',
    statusName: 'resourceGone'
  },
  {
    testName: '429 test',
    statusName: 'manyRequests'
  },
  {
    testName: '500 test',
    statusName: 'serverError'
  },
  {
    testName: '502 test',
    statusName: 'badGateway'
  },
  {
    testName: '503 test',
    statusName: 'serviceUnavailable'
  },
  {
    testName: '504 test',
    statusName: 'gatewayTimeout'
  }

];


it('should verify all status codes', function (done) {
  var count = tests.length;

  async.timesSeries(count, function (i, next) {

    var statusCode = statusCodes[tests[i].statusName].code;

    var url = baseurl + '/' + statusCode;

    request(url, function (err, res, body) {
      if (err) return next(err);
      verify(res, statusCode, next);
    });

  }, function (err) {
    done(err);
  });


});

