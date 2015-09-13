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

    query.first({
        success: function(results) {
            response.success(data);
        },
        error: function(err) {
            response.success(err);
        }
    });
    
    
//    var goldenWeek = new GoldenWeek();
//    goldenWeek.set('type', type);
//    goldenWeek.set('userId', userId);
//    goldenWeek.set('purchaseId', purchaseId);
//
//    goldenWeek.save(null, {
//        success: function(data) {
//            response.success(data);
//        },
//        error: function(err) {
//            response.success(err);
//        }
//    });
    
 
    
});

 


module.exports = AV.Cloud;
