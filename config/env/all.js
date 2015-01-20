/**
 * Created by verangasamy on 7/29/14.
 * boolean flag settings like enabling the batch processs or use template engine or not
 * developer  can specify the app level flags as well to enable or disable some functionality
 *
 */

module.exports = {
    root: process.cwd(),
    port: process.env.PORT || 8090,
    templateEngine: 'swig',
    enableWaterline:true,
    enablePersist:false
};
