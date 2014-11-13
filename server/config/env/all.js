
/**
 * Created by verangasamy on 7/29/14.
 * boolean flag settings like enabling the batch processs or use template engine or not
 * developer  can specify the app level flags as well to enable or disable some functionality
 *
 */

'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 8090,
    templateEngine: 'swig',
    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: '@mam#@!',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'usersession',
    //API Server flag
    apiServer: 'true',
    //Batch process server
    batchProcessServer: 'false',
    enableWaterline:'false',
    enablePersist:'false'

};
