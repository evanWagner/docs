$(function() {
    // 数据中心切换
    $(".dataCenterLi").hover(function () {
        $(this).children("ul").stop().slideDown();
        
    }, function () {
        $(this).children("ul").stop().slideUp();
    });


    //banner轮播图
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        speed: 1000,
        // loop: true,
        effect: 'slide',
        // 如果需要分页器
        pagination: '.swiper-pagination',
    });

    //tab切换
    $("#tab li").click(function(event) {
        $(".tab-info").eq($(this).index()).addClass("active").siblings(".tab-info").removeClass('active');
        $(this).addClass("active").siblings("li").removeClass("active");
    });
    $("#tab li").mouseenter(function(event) {
        $(".tab-info").eq($(this).index()).addClass("active").siblings(".tab-info").removeClass('active');
    });

    $(".apply").on('click', function() {
        location.href = '#';
    });
    $("#wfw").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://quickstart.c.haier.net';
        // window.open('http://t.c.haier.net/login?url=http://quickstart.c.haier.net');
    });
    $("#mcloud").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://mcloud.haier.net';
        // window.open('http://t.c.haier.net/login?url=http://mcloud.haier.net');
    });
    $("#containerCloud").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://c.haier.net/console/projects';
        // window.open('http://t.c.haier.net/login?url=http://c.haier.net/console/projects');
    });
    $("#monitor").on("click", function() {
        // location.href = 'http://t.c.haier.net/login?url=http://monitor.c.haier.net';
        // window.open('http://t.c.haier.net/login?url=http://monitor.c.haier.net');
    });
});
