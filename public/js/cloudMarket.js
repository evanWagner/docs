$(function() {


    //返回隐藏
    $(".back").css("display", "none");


    //头部导航
    $(window).scroll(function() {
        var winscrollTop = $(window).scrollTop();
        //回顶部
        var basicResourcesScroll = $("#basicResources").offset().top;
        if (winscrollTop > basicResourcesScroll) {
            $(".back").fadeIn(500);
        } else {
            $(".back").fadeOut(500);
        }

    });

    //APP 市场tab切换
    $("#tab").find("li").mouseenter(function() {
        console.log($(this).index());
        $("#tab").find("li").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $("#tab-info").find(".tab-item").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $(this).addClass('active');
        $("#tab-info").find(".tab-item").eq($(this).index()).addClass('active');
    });
    $("#tab").find("li").click(function() {
        console.log($(this).index());
        $("#tab").find("li").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $("#tab-info").find(".tab-item").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $(this).addClass('active');
        $("#tab-info").find(".tab-item").eq($(this).index()).addClass('active');
    });
    $(".wfw").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://quickstart.c.haier.net';
        window.open('http://t.c.haier.net/login?url=http://quickstart.c.haier.net');
    });
    $(".mcloud").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://mcloud.haier.net';
        window.open('http://t.c.haier.net/login?url=http://mcloud.haier.net');
    });
    $(".containerCloud").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://c.haier.net/console/projects';
        window.open('http://t.c.haier.net/login?url=http://c.haier.net/console/projects');
    });
    $(".monitor").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://monitor.c.haier.net';
        window.open('http://t.c.haier.net/login?url=http://monitor.c.haier.net');
    });
});