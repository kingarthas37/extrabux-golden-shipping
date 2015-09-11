var AV = require('leanengine');



AV.Cloud.define('hello', function (request, response) {


    var query = new AV.Query('GoldenWeek');

    query.first({
        success: function(data) {
            
            if(!data) {
                response.error('查询失败，没有找到匹配的兑换码，请重新输入');
                return;
            }
            
            response.success(data.get('code'));
            
        },
        error: function(error) {
            response.error("Error: " + error.code + " " + error.message);
        }
    });
    
    
});

module.exports = AV.Cloud;
