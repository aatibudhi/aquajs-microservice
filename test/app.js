var app = module.exports = require('express')();

// this route is used to confirm that a positive test
// for a specific status code succeeds
app.get('/:code', function(req, res) {
  res.status(req.params.code).end();
})

