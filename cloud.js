'use strict';
var AV = require('leanengine');



AV.Cloud.define('test', function (request, response) {
    response.success('test ok');
});

module.exports = AV.Cloud;