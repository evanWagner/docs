$(document).ready(function() {
    //banner
    $("#imgactive").addClass("imgactive");
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

    //平台能力
    $("#proclick").find(".div").on("click", function() {
        $("#proclick").find(".div").removeClass("proactive");
        $(this).addClass("proactive");
        $(".proclickk").hide();
        $("#" + $(this).attr("id") + "k").show();
    });

    $(".back").css("display", "none");
    $(document).scroll(function() {

        //头部导航
        var winscrollTop = $(window).scrollTop();

        //回顶部
        var functionScroll = $("#function").offset().top;
        if (winscrollTop > functionScroll) {
            $(".back").fadeIn(500);
        } else {
            $(".back").fadeOut(500);
        }
    });
});