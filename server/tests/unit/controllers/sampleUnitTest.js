var sinon = require('sinon'),
  chai = require('chai').use(require('sinon-chai')),
  expect = chai.expect,
  dirPaths = require(process.cwd() + '/server/config/dirPaths'),
  Application = require(dirPaths.modelsDir + 'Application');

var Controller = require('../../controllers/sampleController.js');
var Model = Application;

describe('API Unit Tests for POST Operation', function() {

  it('GET /users should return 200', function() {
    var spy = sinon.spy();
    Controller.get(null, {
      send: spy
    });
    expect(spy).called;
  });

});

describe('API Unit Tests for POST Operation', function() {

  it('POST /users should return 200', function() {
    var spy = sinon.spy();
    Controller.post(null, {
      send: spy
    });
    expect(spy).called;
  });

});