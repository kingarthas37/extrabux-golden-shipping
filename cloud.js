var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');


//笨鸟，八达
AV.Cloud.define('type1', function (request, response) {

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
                response.success({
                    success:0
                });
            } else {

                var goldenWeek = new GoldenWeek();
                goldenWeek.set('type', type);
                goldenWeek.set('userId', userId);
                goldenWeek.set('purchaseId', purchaseId);
                goldenWeek.save(null, {
                    success: function(data) {
                        response.success({
                            success:1
                        });
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
