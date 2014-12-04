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
    testName: '401 test',
    statusName: 'UNAUTHORIZED',
  }

];



it('should verify all status codes', function (done) {
  var count = tests.length;

  async.timesSeries(count, function(i, next) {

    var statusCode = statusCodes[tests[i].statusName].code;

    var url = baseurl + '/' + statusCode;

    request(url, function (err, res, body) {
      verify(res, statusCode, next);
    });

  }, function() {
    done();
  });


});

