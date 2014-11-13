var app = require('../app'),
  http = require('http')
chai = require('chai');
describe('API Test for Post Operation', function() {

  before(function(done) {
    http.createServer(app, done);
  });

  it('POST /users should return 200', function(done) {
    request()
      .post('/login')
      .set('Content-Type', 'application/json')
      .write(JSON.stringify({
        username: 'test',
        password: 'pass'
      }))
      .expect(200, done);
  });
});

describe('API Test for Get Operation', function() {

  before(function(done) {
    http.createServer(app, done);
  });

  it('GET /users should return 200', function(done) {
    request()
      .get('/login')
      .expect(200, done);
    assert.equal(request()
      .get('/users'), "success");
  });
});
describe('API Test for PUT Operation', function() {

  before(function(done) {
    http.createServer(app, done);
  });

  it('PUT /users should return 200', function(done) {
    request()
      .put('/login/:id')
      .set('Content-Type', 'application/json')
      .write(JSON.stringify({
        username: 'test',
        password: 'pass'
      }))
      .expect(200, done);
  });
});

describe('API Test for DELETE Operation', function() {

  before(function(done) {
    http.createServer(app, done);
  });

  it('DELETE /users should return 200', function(done) {
    request()
      .delete('/login/:id')
      .set('Content-Type', 'application/json')
      .write(JSON.stringify({
        username: 'test',
        password: 'pass'
      }))
      .expect(200, done);
  });
});