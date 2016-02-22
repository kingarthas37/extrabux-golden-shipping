'use strict';

var AV = require('leanengine');
var H5TemplateVisitor = AV.Object.extend('H5Template');

AV.Cloud.define('2016-h5-template-visit', function (request, response) {
    H5TemplateVisit(request,response);
});

function H5TemplateVisit(request, response) {

    var slug = request.params.slug;

    var newVisit = new H5TemplateVisitor();

    newVisit.save({'slug':slug}).then(function(post){
        response.success({
            result: 'success',
            msg:'New object created with objectId: ' + post.id
        });
    },function(err){
        response.error({
            result: 'fail',
            msg:'Failed to create new object, with error message: ' + err.message
        });
    })

}