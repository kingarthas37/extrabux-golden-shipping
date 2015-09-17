'use strict';

module.exports = function(userId,purchaseId,signature, benniaoUrl) {

    var container = $('#golden-week-page');

    var countDownTime = $('.countdown-time');
    var currentTime = parseInt(countDownTime.attr('data-start') * 1000),
        endTime = parseInt(countDownTime.attr('data-end')) * 1000;
    countDownTime.countdown(currentTime, new Date(endTime), function (event) {
        $(this).html(event.strftime('<span>%H</span>:' + '<span>%M</span>:' + '<span>%S</span>'));
    });


    if (window.isSoftLoggedIn) {
        setShareFancybox();
    } else {
        setTransferFancybox();
    }


    var topBanner = $('.top-banner');
    var jcarousel = topBanner.find('.jcarousel');
    jcarousel.jcarousel({
        wrap: 'circular'
    }).jcarouselAutoscroll({
        interval: 3000,
        target: '+=1',
        autostart: true
    });
    topBanner.find('.left').jcarouselControl({
        target: '-=1'
    });
    topBanner.find('.right').jcarouselControl({
        target: '+=1'
    });


    var floatZoom = container.find('.zoom');
    floatZoom.click(function () {
        var $this = $(this);
        if ($this.hasClass('on')) {
            $this.removeClass('on');
            $this.prev().removeClass('on');
            $this.find('span').text('更多');
        } else {
            $this.addClass('on');
            $this.prev().addClass('on');
            $this.find('span').text('收起');
        }
    });


    $('.congrats').find('.close').click(function () {
        $(this).parent().detach();
    });

    var floatLayer = $('.float-layer');
    var dom = $('html,body');

    floatLayer.find('a[data-target]').each(function () {
        $(this).click(function () {
            dom.animate({scrollTop: $('.' + $(this).attr('data-target')).offset().top});
        });
    });

    floatLayer.find('.link-top').click(function () {
        dom.animate({scrollTop: 0});
    });


    /*  转运code  start */
    var boxCoupon = $('.box-coupon');
    var modalForwardCoupon = $('#model-forward-coupon');
    var getCode = false;


    boxCoupon.find('.get-coupon').fancybox({
        padding: 0,
        autoScale: false,
        title: null,
        width: 600,
        height: 400,
        showCloseButton: false,
        onStart: function (target) {
            modalForwardCodeAvaliable.call($(target));
        },
        onClosed: function () {
            modalForwardCoupon.find('.panel-code').hide();
            modalForwardCoupon.find('.panel-info').hide();
            modalForwardCoupon.find('.get.disabled').removeClass('disabled').text('领取');
            modalForwardCoupon.find('.get').off('click');
        }
    });

    modalForwardCoupon.find('.close').click(function () {
        $.fancybox.close();
    });

    modalForwardCoupon.find('.panel-info.login a').attr('href', '/users/login?return=%2Fcampaigns%2F2015-golden-week');

    function modalForwardCodeAvaliable() {

        var _this = this;
        var tag = _this.attr('data-tag');

        modalForwardCoupon.find('h3').text(_this.attr('data-title') + '免费领');
        modalForwardCoupon.find('ul').html($('.regular-info[data-tag=' + tag + ']').html());
        modalForwardCoupon.find('.logo-forward').removeAttr('class').addClass('logo-forward logo-' + tag);
        modalForwardCoupon.find('.tit').text(_this.attr('data-name'));

        var type = $.trim(_this.attr('data-type'));
        switch(type) {
            case 'B':
                modalForwardCoupon.find('.panel-banner').show();
                modalForwardCoupon.find('.panel-banner a').attr('href',benniaoUrl);
                modalForwardCoupon.find('.panel-banner img').attr('src','//static.extrabux.com/images/campaign/golden-week/benniao.jpg');
                modalForwardCoupon.find('.panel-select').hide();
                break;
            case 'BA':
                modalForwardCoupon.find('.panel-banner').show();
                modalForwardCoupon.find('.panel-banner a').attr('href','http://www.8dexpress.com/register.html?source=exgoldenweek');
                modalForwardCoupon.find('.panel-banner img').attr('src','//static.extrabux.com/images/campaign/golden-week/bada.jpg');
                modalForwardCoupon.find('.panel-select').hide();
                break;
            case 'BANMA':
                modalForwardCoupon.find('.panel-banner').show();
                modalForwardCoupon.find('.panel-banner a').attr('href','http://www.360zebra.com/register/?csName=Extrabux');
                modalForwardCoupon.find('.panel-banner img').attr('src','//static.extrabux.com/images/campaign/golden-week/banma.jpg');
                modalForwardCoupon.find('.panel-select').show();
                break;
            case 'SF':
                modalForwardCoupon.find('.panel-banner').hide();
                modalForwardCoupon.find('.panel-select').hide();
                break;
            case 'Z':
                modalForwardCoupon.find('.panel-banner').hide();
                modalForwardCoupon.find('.panel-select').hide();
                break;
            case 'T':
                modalForwardCoupon.find('.panel-banner').hide();
                modalForwardCoupon.find('.panel-select').hide();
                break;
        }


        //笨鸟注册
        if(type === 'B' && !benniaoUrl) {
            modalForwardCoupon.find('.get').addClass('disabled');
            modalForwardCoupon.find('.panel-banner').hide();
        } else {
            modalForwardCoupon.find('.get').removeClass('disabled');
        }


        //未登录
        if (!window.isSoftLoggedIn) {
            modalForwardCoupon.find('.panel-info.login').show();
            modalForwardCoupon.find('.get').addClass('disabled');
            return;
        }

        //未下单
        if (!purchaseId) {
            modalForwardCoupon.find('.panel-info.order').show();
            modalForwardCoupon.find('.get').addClass('disabled');
            return;
        }

        //已领取
        if (_this.data('get')) {
            modalForwardCoupon.find('.get').addClass('disabled').text('已领取');
            modalForwardCoupon.find('.panel-code').css('display', 'block');
            modalForwardCoupon.find('.code-input').val(_this.attr('data-code'));
            return;
        }

        //本次purchase已领取
        if(getCode) {
            modalForwardCoupon.find('.get').addClass('disabled');
            modalForwardCoupon.find('.panel-info.purchase').show();
            return;
        }



        modalForwardCoupon.find('.get').on('click', function () {

            var $this = $(this);

            if($this.data('loading')) {
                return;
            }
            $this.data('loading',true);

            if (_this.data('get')) {
                return;
            }

            if(type === 'B' && !benniaoUrl) {
                return;
            }

            //shipping type
            var mode = 0;
            var url = 'http://extrabux-golden-week.avosapps.com/1.1/functions/type';
            var type = $.trim(_this.attr('data-type'));
            var _type = type;


            switch(type) {
                case 'B':
                    mode = 1;
                    url += mode;
                    _type = type;
                    break;
                case 'BA':
                    mode = 1;
                    url += mode;
                    _type = type;
                    break;
                case 'BANMA':
                    mode = 1;
                    url += mode;
                    _type = modalForwardCoupon.find('.banma-select').val();
                    break;
                case 'SF':
                    mode = 1;
                    url += mode;
                    _type = type;
                    break;
                case 'Z':
                    mode = 3;
                    url += mode;
                    _type = type;
                    break;
                case 'T':
                    mode = 2;
                    url += mode;
                    _type = type;
                    break;
            }

            $.ajax({
                url: url,
                type:'POST',
                data: {
                    userId: userId,
                    purchaseId: purchaseId,
                    type: _type,
                    signature: signature
                },
                success: function (data) {

                    $this.data('loading',false);

                    //同一purchase
                    if(data.result.success === 3) {
                        getCode = true;
                        modalForwardCoupon.find('.get').addClass('disabled');
                        modalForwardCoupon.find('.panel-info.purchase').show();
                    }

                    //领取完
                    else if(data.result.success === 2) {
                        modalForwardCoupon.find('.panel-info.last').show();
                        modalForwardCoupon.find('.get').addClass('disabled');
                    }

                    //领取成功
                    else {

                        _this.data('get', true);
                        modalForwardCoupon.find('.code-input').val(data.result.code);
                        modalForwardCoupon.find('.panel-code').css('display', 'block');

                        _this.attr('data-code', data.result.code);
                        _this.text('查看优惠代码');
                        _this.addClass('disabled').text('已领取');
                        $this.addClass('disabled').text('已领取');
                        $this.off('click');

                        getCode = true;

                    }



                }
            });


        });

    }

    /* 转运code end */


    //笨鸟modal
    if(location.hash === '#B') {
        $('.get-coupon[data-type=B]').click();
    }

}; 