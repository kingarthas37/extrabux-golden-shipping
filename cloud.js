'use strict';
var AV = require('leanengine');

require('./cloud/type1');
require('./cloud/type2');
require('./cloud/type3');

require('./cloud/promo-2015-blackfriday-banma');
 

AV.Cloud.define('test', function (request, response) {
    response.success('test ok');
});

module.exports = AV.Cloud;