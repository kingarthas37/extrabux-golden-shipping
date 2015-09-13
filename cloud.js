var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');


AV.Cloud.define('bada', function (request, response) {

    var userId = request.params.userId;
    var purchaseId = request.params.purchaseId;
    var type = request.params.type;

   // response.success(request);
    
    var query = new AV.Query(GoldenWeek);
    
    query.equalTo('type', type);

    var post = new GoldenWeek();
    post.set('type', 'BA');
    post.set('userId','abc');
    post.set('purchaseId','def');

    post.save(null, {
        success: function() {
            response.success(type + ',' + userId + ',' + purchaseId);
        },
        error: function(err) {
            response.success(err);
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
