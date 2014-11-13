/**
 * Created by vrangasamy on 7/31/2014.
 */

module.exports = function (app) {
    // Controller Mapping Jade
    var example = require('../controllers/example');

    app.get('/', example.index)

}