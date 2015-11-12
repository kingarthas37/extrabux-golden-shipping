'use strict';
var AV = require('leanengine');

require('./cloud/type1');
require('./cloud/type2');
require('./cloud/type3');

require('./cloud/promo-2015-banma');
require('./cloud/promo-2015-bada');
require('./cloud/promo-2015-benniao');
require('./cloud/promo-2015-sifang');

require('./cloud/promo-shipping-company');
require('./cloud/promo-shipping-company-multiple');
 

AV.Cloud.define('test', function (request, response) {
    response.success('test ok');
});

module.exports = AV.Cloud;