'use strict';

var AV = require('leanengine');
var H5TemplateLike = AV.Object.extend('H5TemplateLike');

AV.Cloud.define('2016-h5-template-like-analyze', function (request, response) {
    H5TemplateFoo(request,response);
});

function  H5TemplateFoo(request, response) {
    let data = [];

    let slug = request.params.slug;

    let len = request.params.len;

    var promises = [];

    for(let i=0; i<len; i++){
        let likeQuery = new AV.Query(H5TemplateLike);
        likeQuery.equalTo('slug',slug);
        likeQuery.equalTo('likes',i+1+'');
        promises.push(likeQuery.count().then(
            (count)=>{
                data[i]=count;
            }
        ))
    }

    AV.Promise.when(promises).then(
        ()=>{
            response.success({
                result: 'success',
                awosomeData: data
            });
        },
        (err)=>{
            response.error({
                result: 'fail',
                msg:'Failed to load awosome analytical data, with error message: ' + err.message
            });
        }
    )

}