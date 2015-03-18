var path = require('path');

var serverDir = exports.serverDir = process.cwd();
exports.implDir = path.join(serverDir, 'impls/');
exports.configDir = path.join(serverDir, 'config/');
exports.modelsDir = path.join(serverDir, 'models/');
exports.routesDir = path.join(serverDir, 'routes/');
exports.controllersDir = path.join(serverDir, 'controllers/');
exports.nodeModulesDir = path.join(serverDir, 'node_modules/');