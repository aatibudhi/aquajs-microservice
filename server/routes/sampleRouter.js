var sampleRouter = function(app) {
  var sampleController = require(path.join(dirPaths.controllersDir, 'sampleController'));
  app.get('/application/:appid', sampleController.getApp);
}
module.exports = sampleRouter;