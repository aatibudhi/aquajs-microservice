var thisAPImpl = null;
try {
  thisAPImpl = require("../implementation/sample");
} catch (e) {
  // No implementation has been provided yet..
  // But that's OK because each end-point defined below will remind us...
}

var sampleController = {
  getApp: function(req, res) {
    try {
      return thisAPImpl.getApp(req, res);
    } catch (e) {
      var html = 'GET : Login with username and password <br/><br/>';
      html += 'exports.<b>.getApp</b>.(req, res) {...}<br/><br/>';
      html += 'should be exposed from within <b>server/implementation/sample.js</b><br/><br/>';
      html += 'you can access <b>app.models[...]</b> to manipulate your data...';
      res.send(html);
    }
  },
  postApp: function(req, res) {
    try {
      return thisAPImpl.postApp(req, res);
    } catch (e) {
      var html = 'POST : Register new application <br/><br/>';
      html += 'exports.<b>.postApp</b>.(req, res) {...}<br/><br/>';
      html += 'should be exposed from within <b>server/implementation/sample.js</b><br/><br/>';
      html += 'you can access <b>app.models[...]</b> to manipulate your data...';
      res.send(html);
    }
  }
}
module.exports = sampleController;