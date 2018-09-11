$(function() {


    //返回隐藏
    $(".back").css("display", "none");


    //头部导航
    $(window).scroll(function() {
        var winscrollTop = $(window).scrollTop();
        //回顶部
        var toolChainScroll = $("#toolChain").offset().top;
        if (winscrollTop > toolChainScroll) {
            $(".back").fadeIn(500);
        } else {
            $(".back").fadeOut(500);
        }

    });

    //我们的能力tab切换
    $("#tab").find("li").click(function() {
        console.log($(this).index());
        $("#tab").find("li").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $("#tab-info").find("li").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $(this).addClass('active');
        $("#tab-info").find("li").eq($(this).index()).addClass('active');
    });
    $("#tab").find("li").mouseenter(function() {
        console.log($(this).index());
        $("#tab").find("li").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $("#tab-info").find("li").each(function(index, ele) {
            $(ele).removeClass('active');
        });
        $(this).addClass('active');
        $("#tab-info").find("li").eq($(this).index()).addClass('active');
    });
});