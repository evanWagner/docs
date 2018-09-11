$(function() {

    $(window).scroll(function() {
        var winscrollTop = $(window).scrollTop();

        //回顶部
        var openPlatformScroll = $("#openPlatform").offset().top;
        if (winscrollTop > openPlatformScroll) {
            $(".back").fadeIn(500);
        } else {
            $(".back").fadeOut(500);
        }

        var stratScroll = $('.deverloper-platformValue').offset().top; //动画开始区域
        var stopScroll = $('.deverloper-process').offset().top; //动画结束区域
    });
    //返回隐藏
    $(".back").css("display", "none");

    var trussMoveLock = 0;
    $('.deverloper-openService .tab-box .tab-item').on('click', function() {
        var index = $(this).index();
        if (index == 1) {

        } else {
            $(this).addClass('active').siblings().removeClass('active');
            $('.deverloper-openService .tab-content-box .tab-content-item').eq(index)
                .addClass('active').siblings().removeClass('active');
        }
    });
    $(".wfw").on('click', function() {
        // window.open('http://mcloud.haier.net');//新页面
        // location.href = 'http://t.c.haier.net/login?url=http://quickstart.c.haier.net';
        window.open('http://t.c.haier.net/login?url=http://quickstart.c.haier.net');
    });
    $(".mcloud").on('click', function() {
        // location.href = 'http://t.c.haier.net/login?url=http://mcloud.haier.net';
        window.open('http://t.c.haier.net/login?url=http://mcloud.haier.net');
    });
    $(".containerCloud").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://c.haier.net/console/projects';
        window.open('http://t.c.haier.net/login?url=http://c.haier.net/console/projects');
    });
});