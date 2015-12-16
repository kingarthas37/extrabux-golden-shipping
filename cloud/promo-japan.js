'use strict';

var AV = require('leanengine');
var JapanFudai = AV.Object.extend('JapanFudai');
var async = require('async');



//日淘抽奖
AV.Cloud.define('japan-promo-prizes', function (req, res) {

    var userId = parseInt(req.params.userId);
    
    async.waterfall([
        
        function(cb) {
            
            var query = new AV.Query(JapanFudai);
            query.equalTo('userId',parseInt(userId));

            var startDate = new Date(new Date().toDateString()).getTime();
            var endDate = startDate + 1000 * 60 * 60 * 24;

            query.greaterThan('createdAt',new Date(startDate));
            query.lessThan('createdAt',new Date(endDate));

            query.first({
                success:function(user) {
                    //如果该用户今天已抽过奖
                    if(user) {
                        return res.success({
                            success:0
                        });
                        
                    //如果没有抽过，生成随机数2,3,4，传入    
                    } else {
                        //结果 2,3,4
                        var type = Math.floor(Math.random()* 3 + 2);
                        cb(null,type);
                    }
                },
                error:function(err) {
                    res.error(err);
                }
            });
        },
        
        //对抽奖进行判断
        function(type,cb) {

            
            var query = new AV.Query(JapanFudai);
            query.equalTo('type',type);

            var startDate = new Date(new Date().toDateString()).getTime();
            var endDate = startDate + 1000 * 60 * 60 * 24;

            query.greaterThan('createdAt',new Date(startDate));
            query.lessThan('createdAt',new Date(endDate));
            
            query.count().then(function(count) {
                
                switch (type) {

                    //共7300份，每天270份，活动结束截止
                    case 2:
                        if(count < 271) {
                            cb(null,3);
                        } else {
                            cb(null,4);
                        }
                    break;
                    
                    //共270份，每天10份，活动结束截止
                    case 3:
                        if(count < 11) {
                            cb(null,2);
                        } else {
                            cb(null,4);
                        }
                        
                    break;
                    
                    //最后一种，无限量，直接保存
                    case 4:
                        cb(null,4);
                    break;

                }
            
            });
            
           
        
        },
        
        
        //保存数据
        function(type) {
            
            var fudai = new JapanFudai();
            fudai.set('userId',parseInt(userId));
            fudai.set('type',type);
            fudai.save(null,{
                success:function(data) {
                    res.success({
                        success:1,
                        type:type
                    });
                },
                error:function(err) {
                    res.error(err);
                }
            });
        }
    
    ]);

});



AV.Cloud.define('japan-promo-prize-get', function (req, res) {

    var userId = parseInt(req.params.userId);

    var query = new AV.Query(JapanFudai);
    query.equalTo('userId',parseInt(userId));

    var startDate = new Date(new Date().toDateString()).getTime();
    var endDate = startDate + 1000 * 60 * 60 * 24;

    query.greaterThan('createdAt',new Date(startDate));
    query.lessThan('createdAt',new Date(endDate));

    query.first({
        success:function(user) {
            //如果该用户今天已抽过奖
            if(user) {
                return res.success({
                    success:true
                });
            } else {
                return res.success({
                    success:false
                });
            }
        },
        error:function(err) {
            res.error(err);
        }
    });
    
});