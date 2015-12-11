'use strict';

var AV = require('leanengine');
var JapanFudai = AV.Object.extend('JapanFudai');
var async = require('async');

//日淘抽奖
AV.Cloud.define('japan-prize', function (req, res) {
    
    var userId = req.query.userId || '';
    
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
                    if(user) {
                        return res.success({
                            success:0
                        });
                    } else {
                        cb(null);
                    }
                },
                error:function(err) {
                    res.error(err);
                }
            });
        },
        
        function() {
            
            var fudai = new JapanFudai();

            var type = Math.floor(Math.random()* 4 + 1);
            
            fudai.set('userId',userId);
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