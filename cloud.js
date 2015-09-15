'use strict';
var AV = require('leanengine');

var crypto = require('crypto');
var signature = crypto.createHash('sha256').update('kingarthas').digest('hex');

require('./cloud/type1');
require('./cloud/type2');
require('./cloud/type3');

AV.Cloud.define('test', function (request, response) {
    response.success('test ok');
});

AV.Cloud.define('signature',function(request,response) {
    
    response.success(signature + ',kingarthas');
    
});

module.exports = AV.Cloud;