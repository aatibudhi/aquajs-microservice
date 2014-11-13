path = require("path");

//var serverDir = path.join( process.cwd() , 'server/');
var serverDir  = exports.serverDir =  path.join( process.cwd() , 'server/');
exports.configDir = path.join( serverDir , 'config/');
exports.modelsDir = path.join( serverDir + 'models/');
exports.routesDir = path.join(serverDir + 'routes/');
exports.controllersDir = path.join(serverDir + 'controllers/');
exports.nodeModulesDir = path.join(serverDir + 'node_modules/')