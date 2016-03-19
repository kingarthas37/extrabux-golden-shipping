'use strict';

var AV = require('leanengine');


AV.Cloud.define('index-slider', function (req, res) {
    
    res.success([
        {
            src: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
            url: 'http://www.baidu.com'
        },
        {
            src: 'http://s.amazeui.org/media/i/demos/bing-2.jpg',
            url: 'http://www.sohu.com'
        },
        {
            src: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
            url: 'http://www.qq.com'
        }]);

});