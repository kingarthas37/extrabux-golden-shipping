'use strict';

var AV = require('leanengine');
var GoldenWeek = AV.Object.extend('GoldenWeek');

module.exports = function() {

    var post = new GoldenWeek();
    post.set("code", "12345");
    post.set("type", "222");
    post.save(null, {
        success: function() {
            response.success('okkokokk');
        },
        error: function(err) {
        }
    });
    
};