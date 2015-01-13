"use strict";
var path = require('path'),
    aquajsErrorConstant = require(path.join($dirPaths.serverDir,'config','env','error-constants.json')),
    extendedErrorConstant = require(path.join($dirPaths.serverDir,'config','env','extended-error-constants'));
var AquaJsErrors = function () {
    var errors = [];
    this.errors = errors;

};
/**
 * AquaJS Error Constructor to list all the errors
 * Lets say you wanted to send multiple errors to the browser
 * you can push the list of errors to the errors list and pass that list while throwing the aqua js error
 * Framework will take care of sending the list of error in a json format
 * @api public
 * @param
 * @see
 * @return {Aquajs Error Object}
 */
AquaJsErrors.prototype.addError = function (configName, property, message, more_info) {
    var errorConfig;
    if (undefined !== aquajsErrorConstant || undefined !== extendedErrorConstant  ) {
        errorConfig = aquajsErrorConstant[configName];
        if(undefined == errorConfig) {
            errorConfig = extendedErrorConstant[configName];
        }
        if(undefined == errorConfig) {
            errorConfig.status =400;
            errorConfig.property = "";
            errorConfig.message = "error key not found"
            errorConfig.more_info = "please provide the correct error key";
        }
    }
    this.errors.push(errorConfig);
};
AquaJsErrors.prototype.getErrors = function () {
    return this.errors;
};
AquaJsErrors.prototype.hasError = function () {
    return this.errors.length > 0;
};

module.exports = AquaJsErrors;