'use strict';

var AV = require('leanengine');
var H5TemplateLike = AV.Object.extend('H5TemplateLike');

AV.Cloud.define('2016-h5-template-like', function (request, response) {
    methods.belike(request,response);
});

AV.Cloud.define('2016-h5-template-cancel-like', function (request, response) {
    methods.cancelLike(request,response);
});

var methods = {
    belike: function (request, response){
        let slug = request.params.slug;
        let likes = request.params.likes;

        new H5TemplateLike().save({
            'likes':likes,
            'slug':slug

        }).then(
            (post)=>{
                response.success({
                    result: 'success',
                    msg:'New object created with objectId: ' + post.id
                })
            },
            (err)=>{
                response.error({
                    result: 'fail',
                    msg:'Failed to create new object, with error message: ' + err.message
                })
            }
        )
    },
    cancelLike: function (request, response){
        let slug=request.params.slug,likes=request.params.likes;
        let likeQuery = new AV.Query(H5TemplateLike);

        likeQuery.equalTo('slug',slug);

        likeQuery.equalTo('likes',likes);

        likeQuery.first().then(
            (object)=>{
                object.destroy().then(
                    ()=>{
                        response.success({
                            result: 'success',
                            msg:'cancel like success'
                        });
                    }
                    ,
                    (err)=>{
                        response.error({
                            result: 'fail',
                            msg:'Failed to cancel like, with error message: ' + err.message
                        });
                    }
                )
            }
            ,
            (err)=>{
                response.error({
                    result: 'fail',
                    msg:'Failed to cancel like, with error message: ' + err.message
                });
            }
        );
    }
};
