'use strict';
var AV = require('leanengine');


require('./cloud/type1');
require('./cloud/type2');



AV.Cloud.define('test', function (request, response) {

    var userId = request.query.userId || '';
    var purchaseId = request.query.purchaseId || '';
    var type = request.query.type || '';
    
    response.success({
        userId:userId,
        type:type,
        purchaseId:purchaseId
    });

});

module.exports = AV.Cloud;