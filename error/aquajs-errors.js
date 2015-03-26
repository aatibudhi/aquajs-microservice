"use strict";

/**
 * AquaJS Error Constructor to list all the errors
 * Lets say you wanted to send multiple errors to the browser
 * you can push the list of errors to the errors list and pass that list while throwing the aqua js error
 * Framework will take care of sending the list of error in a json format
 */
var AquaJsErrors = function () {
    this.errors = [];
};

AquaJsErrors.prototype.addError = function () {
    this.errors.push(arguments);
};
AquaJsErrors.prototype.getErrors = function () {
    return this.errors;
};
AquaJsErrors.prototype.hasError = function () {
    return this.errors.length > 0;
};

module.exports = AquaJsErrors;

