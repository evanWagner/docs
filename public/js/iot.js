$(document).ready(function() {


    $(".back").css("display", "none");

    //平台价值
    var sign = $("#valueactive").hasClass("valueactive");
    if (!sign) {
        var valueactive = $("#valueactive")[0].getBoundingClientRect().top;
        var clientHeight = document.documentElement.clientHeight;
        if (valueactive <= clientHeight) {
            $("#valueactive").addClass("valueactive");
            $("#valueactive").find(".timer").each(count);
        }
    }


    $(document).scroll(function() {
        var winscrollTop = $(window).scrollTop();
        //回顶部
        var iotScroll = $("#iot").offset().top;
        if (winscrollTop > iotScroll) {
            $(".back").fadeIn(500);
        } else {
            $(".back").fadeOut(500);
        }
    });
});