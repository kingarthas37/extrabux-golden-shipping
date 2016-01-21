'use strict';

var AV = require('leanengine');
var SeasonRed = AV.Object.extend('SeasonRed2016');
var SeasonRedUser = AV.Object.extend('SeasonRed2016User');
var companys = ['YD','WZY','TH','YS','SF','BD','B'];

companys.forEach(function (n) {
    AV.Cloud.define('2016-season-red-' + n, function (request, response) {
        seasonRedCodeCreate(request,response);
    });
});

function seasonRedCodeCreate(request, response) {

    var userId = request.params.userId || '';
    var type = request.params.type || '';

    var codeQuery = new AV.Query(SeasonRed);

    codeQuery.equalTo('type', type);

    codeQuery.first({
        success: function (_data) {

            var codeQuerySaveUser = new SeasonRedUser();
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

}