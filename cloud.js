var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');


AV.Cloud.define('hello', function (request, response) {

    var userId = request.params.userId;
    var purchaseId = request.params.purchaseId;
    var type = request.params.type;

    var query = new AV.Query(GoldenWeek);
    query.equalTo('type', type);

    
    var post = new GoldenWeek();
    post.set("code", "12345");
    post.set("type", "222");
    post.save(null, {
        success: function() {
            response.success('okkokokk');
        },
        error: function(err) {
        }
    });
    
//    query.first({
//        success: function(data) {
//            if(!data) {
//                response.error('查询失败，没有找到匹配的兑换码，请重新输入');
//                return;
//            }
//
//
//            
// 
//            
//            data.set('userId',userId);
//            data.set('purchaseId',purchaseId);
//            data.set('type',type);
//            
//            response.success(data);
//        },
//        error: function(error) {
//            response.error("Error: " + error.code + " " + error.message);
//        }
//    });
    
});

module.exports = AV.Cloud;
