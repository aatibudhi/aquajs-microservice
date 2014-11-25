var hippie = require('hippie');

describe('API Integration Tests for GET Operation', function() {

  it('GET /users should return 200', function() {
    hippie()
      .header("User-Agent", "hippie")
      .json()
      .get('http://localhost:8090//application/:appid')
      .expectStatus(200)
      .end(function(err, res, body) {
        if (err) throw err;
      });
  });

});

describe('API Unit Tests for POST Operation', function() {

  it('POST /users should return 200', function() {
    hippie()
      .header("User-Agent", "hippie")
      .json()
      .post('http://localhost:8090//application/:appid')
      .expectStatus(200)
      .end(function(err, res, body) {
        if (err) throw err;
      });
  });
});