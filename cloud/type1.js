'use strict';

var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');
var UserWeek = AV.Object.extend('GoldenUser');

var hash = require('./hash');

//笨鸟，八达 , 斑马 ，转运四方
AV.Cloud.define('type1', function (request, response) {

    var userId = request.params.userId || '';
    var purchaseId = request.params.purchaseId || '';
    var type = request.params.type || '';
    var signature = request.params.signature || '';

    if(!hash(signature,userId,purchaseId)) {
        return response.error('Success Error');
    }
    
    var userQuery = new AV.Query(UserWeek);

    userQuery.equalTo('userId', userId);
    userQuery.equalTo('purchaseId', purchaseId);

    userQuery.first({
        success: function (data) {

            if(data) {

                if (data.get('type') === type) {
                    response.success({
                        success: 0,
                        msg: '您已领取优惠码',
                        code: data.get('code'),
                        type: data.get('type')
                    });
                } else {
                    response.success({
                        success: 3,
                        msg: '同一purchase只能领取一次优惠码'
                    });
                }
                
            } else {

                var codeQuery = new AV.Query(GoldenWeek);
                codeQuery.equalTo('type', type);

                codeQuery.first({
                    success: function (_data) {

                        var codeQuerySaveUser = new UserWeek();
                        codeQuerySaveUser.set('code', _data.get('code'));
                        codeQuerySaveUser.set('type', type);
                        codeQuerySaveUser.set('userId', userId);
                        codeQuerySaveUser.set('purchaseId', purchaseId);
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


            }

        },
        error: function (err) {
            response.error(err);
        }
    });


});