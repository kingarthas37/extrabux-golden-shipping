'use strict';
var AV = require('leanengine');
 

require('./cloud/type1');
require('./cloud/type2');
require('./cloud/type3');

AV.Cloud.define('test', function (request, response) {
    response.success('test ok');
});


AV.Cloud.define('signature',function(request,response) {

    var userId = request.params.userId || '';
    var purchaseId = request.params.purchaseId || '';
    var signature = request.params.signature || '';
    
    if(signature === getSignature(userId,purchaseId)) {
        response.success(signature + ',' + getSignature(userId,purchaseId) + ',' + 'yes');
    } else {
        response.success(signature + ',' + getSignature(userId,purchaseId) + ',' + 'no');
    }
    
    response.success(signature + ',kingarthas');
    
});


function getSignature(userId,purchaseId) {
    var str = userId + ' ' + purchaseId + ' ' +  'extrabux2015-luck123';
    return crypto.createHash('sha256').update(str).digest('hex');
}

module.exports = AV.Cloud;