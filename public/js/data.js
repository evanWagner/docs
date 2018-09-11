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
    //平台价值
    var sign = $("#valueactive").hasClass("valueactive");
    // console.log(sign);
    if (!sign) {
        var valueactive = $("#valueactive")[0].getBoundingClientRect().top;
        var clientHeight = document.documentElement.clientHeight;
        if (valueactive <= clientHeight) {
            $("#valueactive").addClass("valueactive");
            $("#valueactive").find(".timer").each(count);
            setTimeout(function() {
                $("#valueactive").addClass("valueactivehover");
            }, 2000)
        }
    }
    //数据能力tab切换
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
    //跳转链接
    $(".goin").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://dmc.haier.net';
        // window.open('http://t.c.haier.net/login?url=http://dmc.haier.net');
    });
});
