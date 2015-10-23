'use strict';

var AV = require('leanengine');
var BlackFriday = AV.Object.extend('BlackFriday');
var BlackFridayUser = AV.Object.extend('BlackFridayUser');

var hash = require('./hash'); 



//2015 Black Friday 斑马
AV.Cloud.define('2015-BANMA', function (request, response) {

    var userId = request.params.userId || '';
    var type = request.params.type || '';

    var codeQuery = new AV.Query(BlackFriday);
    
    
    codeQuery.equalTo('type', type);

    codeQuery.first({
        success: function (_data) {

            response.success(111);
            
            var codeQuerySaveUser = new BlackFridayUser();
            codeQuerySaveUser.set('code', _data.get('code'));
            codeQuerySaveUser.set('type', type);
            codeQuerySaveUser.set('userId', userId);
            codeQuerySaveUser.save(null, {
                success: function () {
                    response.success({
                        success: 1,
                        msg: '领取优惠码成功！',
                        code:_data.get('code')
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
    


});