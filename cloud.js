var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');


AV.Cloud.define('bada', function (request, response) {

    var userId = request.params.userId || '';
    var purchaseId = request.params.purchaseId || '';
    var type = request.params.type || '';

    
    var query = new AV.Query(GoldenWeek);
    
    query.equalTo('type', type);

    var post = new GoldenWeek();
    post.set('type', type);
    post.set('userId', userId);
    post.set('purchaseId', purchaseId);

    post.save(null, {
        success: function(data) {
            response.success(data);
        },
        error: function(err) {
            response.success(err);
        }
    });
    
 
    
});

 


module.exports = AV.Cloud;
