var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');


AV.Cloud.define('bada', function (request, response) {

    var userId = request.params.userId || '';
    var purchaseId = request.params.purchaseId || '';
    var type = request.params.type || '';

    
    var query = new AV.Query(GoldenWeek);
    
    query.equalTo('type', type);
    query.equalTo('userId',userId);
    query.equalTo('purchaseId',purchaseId);

    query.find({
        success: function(data) {
            
            if(data) {
                
             //   data.set('success',0);
             //   data.set('msg','优惠码已生成');
                response.success(data);
                
            } else {

                var goldenWeek = new GoldenWeek();
                goldenWeek.set('type', type);
                goldenWeek.set('userId', userId);
                goldenWeek.set('purchaseId', purchaseId);
                goldenWeek.save(null, {
                    success: function(data) {

                        data.set('success',1);
                    //    data.set('msg','成功');
                        response.success(data);
                    },
                    error: function(err) {
                        response.error(err);
                    }
                });
                
                
                
            }
            
        },
        error: function(err) {
            response.error(err);
        }
    });
    
    

    
 
    
});

 


module.exports = AV.Cloud;
