'use strict';

var AV = require('leanengine');
var ShippingCompanyTJ = AV.Object.extend('ShippingCompanyTJ');
var ShippingCompanyZS = AV.Object.extend('ShippingCompanyZS');
var ShippingCompanyZYB = AV.Object.extend('ShippingCompanyZYB');


var ShippingCompanyUser = AV.Object.extend('ShippingCompanyUser');

var hash = require('./hash'); 


AV.Cloud.define('shipping-company-TJ', function (request, response) {
    shippingCompanyCodeCreate(request, response, ShippingCompanyTJ);
});

AV.Cloud.define('shipping-company-ZS', function (request, response) {
    shippingCompanyCodeCreate(request, response, ShippingCompanyZS);
});

AV.Cloud.define('shipping-company-ZYB', function (request, response) {
    shippingCompanyCodeCreate(request, response, ShippingCompanyZYB);
});


function shippingCompanyCodeCreate(request,response,ShippingCompany) {

    var userId = request.params.userId || '';
    var type = request.params.type || '';
    var signature = request.params.signature || '';

    if(!hash(signature,userId)) {
        //  return response.error('Success Error');
    }

    var codeQuery = new AV.Query(ShippingCompany);

    codeQuery.equalTo('type', type);

    codeQuery.first({
        success: function (_data) {

            if(!_data) {
                return response.success({
                    success:-1,
                    msg:'优惠码已被领取完'
                });
            }

            var codeQuerySaveUser = new ShippingCompanyUser();
            codeQuerySaveUser.set('code', _data.get('code'));
            codeQuerySaveUser.set('type', type);
            codeQuerySaveUser.set('userId', userId);
            codeQuerySaveUser.save(null, {
                success: function () {
                    _data.destroy().then(function() {

                        response.success({
                            success: 1,
                            msg: '领取优惠码成功！',
                            code:_data.get('code')
                        });

                    });
                },
                error: function (err) {
                    response.error(err);
                }
            });

        },
        error: function (err) {
            response.error(err);
        }
    });

}