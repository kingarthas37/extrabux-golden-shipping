var AV = require('leanengine');



AV.Cloud.define('hello', function (request, response) {

    var userId = request.params.userId;
    var purchaseId = request.params.purchaseId;
    var type = request.params.type;

    var query = new AV.Query('GoldenWeek');
    query.equalTo('type', type);
    
    query.first({
        success: function(data) {
            if(!data) {
                response.error('查询失败，没有找到匹配的兑换码，请重新输入');
                return;
            }


            var post = new Post();
            post.set("code", "12345");
            post.set("type", "222");

            post.save(null, {
                success: function(post) {
                    // 成功保存之后，执行其他逻辑.
                },
                error: function(post, error) {
                    // 失败之后执行其他逻辑
                    // error 是 AV.Error 的实例，包含有错误码和描述信息.
                }
            });
            
            
            data.set('userId',userId);
            data.set('purchaseId',purchaseId);
            data.set('type',type);
            
            response.success(data);
        },
        error: function(error) {
            response.error("Error: " + error.code + " " + error.message);
        }
    });
    
});

module.exports = AV.Cloud;
