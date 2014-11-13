/**
 * Created by Chakradhar Jonagam
 */
"use strict";

var indexController = {
    // Home page render
    index: function (req, res) {
        res.json('Aqua App working fine', { response: 'Aqua App working fine' });
    }
}

module.exports = indexController;
