var app = require('../app'),
  http = require('http')
chai = require('chai');
describe('API Test for Post Operation', function() {

  before(function(done) {
    http.createServer(app, done);
  });

  it('POST /users should return 200', function(done) {
    request()
      .post('/getVCs')
      .set('Content-Type', 'application/json')
      .write(JSON.stringify({
        username: 'test',
        password: 'pass'
      }))
      .expect(200, done);
  });
});