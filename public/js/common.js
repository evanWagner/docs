$(function() {

    //头部导航
    $(window).scroll(function() {
        var winscrollTop = $(window).scrollTop();

        if (winscrollTop > 65) {
            // console.log(winscrollTop);
               // start 添加数据中心 下拉菜单随导航颜色变化而变化
            $("#cities").css("background-color", "rgba(255,255,255,0.98)").css("boxShadow", "0 2px 4px rgba(0,0,0,.1)");
            // end
            $("#nav").css("background-color", "rgba(255,255,255,0.98)").css("boxShadow", "0 2px 4px rgba(0,0,0,.1)");
            $("#nav").find(".logo img").attr("src", "./logo1.png");
            $("#nav").find("li a").css("color", "#262626")
            $("#nav").find("li a.active").css("color", "#30b5f2");
            $("#nav").find(".user .name").css("color", "#262626");
            $("#nav").find(".user i").css("border-top", "6px solid #262626");
            $("#login").css("color", "#858585").css("borderColor", "#858585");
            $("#register").css("color", "#fff").css("background-color", "#30b5f2");
            $("#login").mouseenter(function() {
                $(this).css("color", "#30b5f2").css("borderColor", "#30b5f2");
            });
            $("#login").mouseleave(function() {
                $(this).css("color", "#858585").css("borderColor", "#858585");
            });
            $("#register").mouseenter(function() {
                $(this).css("color", "#fff").css("background-color", "#22a8e5");
            });
            $("#register").mouseleave(function() {
                $(this).css("color", "#fff").css("background-color", "#30b5f2");
            });

            $("#nav").find("li").mouseenter(function() {
                // $(this).find("a").css("color", "#30b5f2");//原来的鼠标滑过导航a变迁变化颜色 注释是为了去除添加数据中心时的a标签与原来a标签颜色冲突
                $(this).children("a").css("color", "#30b5f2");//添加数据中心
            });
            $("#nav").find("li").mouseleave(function() {
                // $(this).find("a").css("color", "#262626");
                $(this).children("a").css("color", "#262626")
                $(this).find("a.active").css("color", "#30b5f2");
            });
            //start 添加数据中心  字体颜色随导航栏颜色变化而变化对应的颜色
            $("#cities").find("li").mouseenter(function() {
                $(this).find("a").css("color", "#30b5f2");
            })
            $("#cities").find("li").mouseleave(function () {
                $(this).find("a").css("color", "#262626");
            })
            // end

        } else {
            // start 添加数据中心 下拉菜单随导航颜色变化而变化
            $("#cities").css("background-color", "rgba(0, 0, 0, 0.1)").css("boxShadow", "0 2px 4px rgba(0,0,0,.1)");
            // end
            $("#nav").css("boxShadow", "none").css("background-color", "rgba(0,0,0,0.1)");
            $("#nav").find(".logo img").attr("src", "./logo.png");
            $("#nav").find("li a").css("color", "rgba(255,255,255,1)");
            $("#nav").find("li a.active").css("color", "#30b5f2");
            $("#nav").find(".user .name").css("color", "#fff");
            $("#nav").find(".user i").css("border-top", "6px solid #fff");
            $("#login").css("color", "#fff").css("borderColor", "#fff");
            // $("#register").css("color", "#fff").css("background-color", "#30b5f2");
            $("#register").css("color", "#fff")

            $("#login").mouseenter(function() {
                $(this).css("color", "#30b5f2").css("borderColor", "#30b5f2");
            });
            $("#login").mouseleave(function() {
                $(this).css("color", "#fff").css("borderColor", "#fff");
            });
            $("#register").mouseenter(function() {
                $(this).css("color", "#fff").css("background-color", "#22a8e5");
            });
            $("#register").mouseleave(function() {
                $(this).css("color", "#fff").css("background-color", "#30b5f2");
            });

            $("#nav").find("li").mouseenter(function() {
                // $(this).find("a").css("color", "#30b5f2");
                $(this).children("a").css("color", "#30b5f2")
                
            });
            $("#nav").find("li").mouseleave(function() {
                // $(this).find("a").css("color", "#fff");
                 $(this).children("a").css("color", "#fff")
                $(this).find("a.active").css("color", "#30b5f2");
            });
        }
    });

    //登录
    $("#login").on("click", function() {
        // location.href = "http://t.c.haier.net/login?url=http://edop.haier.net/edop_applicationcenter/devops_main.html";
        // window.open("http://t.c.haier.net/login?url=http://edop.haier.net/edop_applicationcenter/devops_main.html");
    });
    $(".console").on("click", function() {
        // location.href = "http://t.c.haier.net/login?url=http://edop.haier.net/edop_applicationcenter/devops_main.html";
        window.open("http://t.c.haier.net/login?url=http://edop.haier.net/edop_applicationcenter/devops_main.html");
    });
    $(".user .logout").on("click", function() {
        location.href = "http://t.c.haier.net/logout?source=http://cosmo-cloud.im-lsb.haier.net";
    });
    $.ajax({
        type: 'get',
        url: 'http://cosmo-cloud.im-lsb.haier.net/me',
        dataType: 'json',
        contentType: "application/json",
        data: '',
        success: function(data) {
            console.log(data);
            if (data) {
                $(".login").css("display", "none");
                $(".user").css("display", "block");
                $(".user .name").text(data.nickname);
                $(".user .username").text(data.nickname);
            } else {
                $(".login").css("display", "block");
                $(".user").css("display", "none");
            }
        },
        error: function(xhr, type) {}
    });
});
