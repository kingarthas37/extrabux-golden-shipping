'use strict';

var AV = require('leanengine');
var Promo17 = AV.Object.extend('Promo17');

AV.Cloud.define('promo-17', function (req, res) {

    var userId = parseInt(req.params.userId);


    var query = new AV.Query(Promo17);

    query.equalTo('userId', userId);

    var startDate = new Date(new Date().toDateString()).getTime();
    var endDate = startDate + 1000 * 60 * 60 * 24;
    query.greaterThan('createdAt', new Date(startDate));
    query.lessThan('createdAt', new Date(endDate));

    query.first().then(function (item) {

        if (item) {
            return res.success({
                success: 0,
                data: {
                    message: '今日已抽过'
                }
            });
        }

        var valueArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6];
        var value = valueArr[Math.floor(Math.random() * valueArr.length)];

        var promo17 = new Promo17();

        promo17.set('userId', userId);
        promo17.set('value', value);

        return promo17.save();

    }).then(function(item) {

        res.success({
            success: 1,
            data: {
                message:'抽奖成功',
                value: item.get('value'),
                userId: userId
            }
        });

    });


});