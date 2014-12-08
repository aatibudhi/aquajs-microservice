var sampleControllerImpl = null;
try {
  sampleServiceImpl = require("../impls/sampleServiceImpl");
} catch (e) {
  // No implementation has been provided yet..
  // But that's OK because each end-point defined below will remind us...
}

var sampleController = {
  getApp: function(req, res) {
    var response = sampleServiceImpl.getApp(req, res);
    res.send(response);
  },
  postApp: function(req, res) {
    var response = sampleServiceImpl.postApp(req, res);
    res.send(response);
  }
}
module.exports = sampleController;