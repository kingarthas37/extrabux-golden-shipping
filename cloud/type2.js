'use strict';

var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');
var UserWeek = AV.Object.extend('GoldenUser');


//笨鸟，八达
AV.Cloud.define('type2', function (request, response) {

    var userId = request.params.userId || '';
    var purchaseId = request.params.purchaseId || '';
    var type = request.params.type || '';

    var userQuery = new AV.Query(UserWeek);

    userQuery.equalTo('type', type);
    userQuery.equalTo('userId', userId);
    userQuery.equalTo('purchaseId', purchaseId);


    userQuery.first({
        success: function (data) {

            if (data) {
                response.success({
                    success: 0,
                    msg: '您已领取优惠码'
                });
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
                                    msg: '领取优惠码成功！'
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