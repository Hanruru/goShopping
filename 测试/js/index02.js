/**
 * Created by Master on 2016/11/1.
 */
$(function(){
    /*
     顶部导航  滚动超出定位
     */
    menuFixed("assortment");
    function menuFixed(menu){
        var menuObj = document.getElementById(menu);
        var menuObjTop = menuObj.offsetTop;
        window.onscroll = function(){   //
            var menuObj = document.getElementById(menu);
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop<menuObjTop){   //超出元素顶部高度设置为 fixed
                menuObj.style.position = 'relative';
            }else{
                menuObj.style.position = "fixed";
                menuObj.style.top = "0";
            }
        }
    }


    /*
     轮播图 banner
     */
    var uls = $("#carousel").find("li");
    var ols = $("#banner-re ol").find("li");
    var index = 0;  //记录 uls 与 ols 中的index相对应
    var lastIndex = uls.size();
    var timer = setInterval(next,2000);

    ols.click(function(){
        index = $(this).index();
        ols.attr("class","");  //清空所有ol样式
        $(this).attr("class","active");  //给点击的ol添加一个新的样式
        uls.stop().fadeTo(500,0);  //图片 li 在500毫秒内消失，为了防止上一个动作的影响，先取消间歇stop()
        uls.eq($(this).index()).stop().fadeTo(500,1);  // ol对应的 ul的图片显示
        $("#index-banner").css("background",uls.background);
        $("#index-banner").stop().animate({backgroundColor:uls.eq($(this).index()).css('background-color')},500);
    })

    //鼠标移动到 banner上停止轮播，取消间歇，移除再恢复轮播
    $("#index-banner").hover(function () {
        clearInterval(timer);
    },function () {
        timer = setInterval(next,1500);
    })

    /*
     轮播下一页
     */
    function next(){
        uls.stop().animate({opacity:"0"},1500);  //所有样式都变为 0
        uls.eq(index).stop().animate({opacity:"1"},1500);  //当前opacity 为 1
        ols.eq(index).attr("class","active");
        ols.eq(index).siblings().attr("class","");
//        $("#index-banner").animate({backgroundColor:uls.eq(index).css('background-color')},1500);  //jquery animate函数不能处理背景色渐变，需要使用jquery.color.js插件
        $("#index-banner").animate({backgroundColor:uls.eq(index).css('background-color')},1000);
        index++;
        if(index>=lastIndex){
            index = 0;
        }
    }

    /*
     nav 导航的引入
     */
    $(".nav ul li").mouseenter(function(){
        $(this).addClass("cur");
        $(this).children(".zicaidan").show();
        $(this).children("s").show();
//        $(this).css("background","#c8ae53");
        $(this).css("background","-webkit-gradient(linear, 0% 0%, 100% 0%,from(#c8ae53), to(#ffffff)"); //颜色渐变

        $(this).find("a").css("color","#000000");
    });

    $(".nav ul li").mouseleave(function(){
        $(this).removeClass("cur");
        $(this).children(".zicaidan").hide();
        $(this).children("s").hide();
        $(this).css("background","");
        $(this).find("a").css("color","");
    });


    /*
     时尚、品牌、大聚惠
     */
    $("#mainContent_Tul ul li").on({
        'mouseenter':function(){   //鼠标浮上
            $(this).siblings('li').removeClass('active')
            $(this).addClass('active');
            $(this).children().css('color','#fff');
            $(this).siblings().children().css('color','#000');
            $('#index-mainCen').find('.item').siblings('.item').css('display','none')
            $('#index-mainCen').find('.item').eq($(this).index()).css('display','block');
        }
    })

    $(".bigimg").on({
        'mouseenter':function(){
            $(this).find('img').stop().animate({'width':'400px','height':'360px','margin-left':"0",'margin-top':'0'},500);
        },
        'mouseleave':function(){
            $(this).find('img').stop().animate({'width':'410px','height':'370px','margin-left':"-5px",'margin-top':'-5px'},500);
        }
    })


    /*
     logo 小轮播
     */
    $('#brand_Left_Btn').on('click',function(){  //点击一次向左移动 110px;
        $('#logo_Lunbo ul').children('li').stop().animate({left:index*(-110)},800);
    })




    /*
     floor 楼层 logo 呼吸轮播
     */

    //    var f1Tab = function (){
//        var interval = 2000; //自动轮播间隔
//        var s = 600;  //淡出淡入时间
//        var nowimg = 0;
//        var floorlis = $('.floor_moreBrand ul').find('li');
//        var floorLBtn = $('.floor_btnLeft');  //左按钮
//        var floorRBtn = $('.floor_btnRight');  //右按钮
//        floorLBtn.click(leftButFunc);
//        floorRBtn.click(rightButFunc);
//
//        //右按钮的业务函数：
//        function rightButFunc() {
//            if(!floorlis.is(":animated")){
//                //老的信号量元素淡出
//                floorlis.eq(nowimg).fadeOut(s);
//                //信号量
//                nowimg++;
//                if (nowimg > floorlis.size() - 1) {
//                    nowimg = 0;
//                }
//                //新的信号量元素淡出
//                floorlis.eq(nowimg).fadeIn(s);
//            }
//
//        }
//        //左按钮的业务函数：
//        function leftButFunc() {
//            if(!floorlis.is(":animated")){
//                //老的信号量元素淡出
//                floorlis.eq(nowimg).fadeOut(s);
//                //信号量
//                nowimg--;
//                if (nowimg < 0) {
//                    nowimg = floorlis.size() - 1;
//                }
//                //新的信号量元素淡出
//                floorlis.eq(nowimg).fadeIn(s);
//            }
//        }
//
//        var floortimer = setInterval(rightButFunc,interval); // 定时器
//
//        $('.floor_moreBrand').mouseover(function(){
//            clearInterval(floortimer);
//        });
//        $('.floor_moreBrand').mouseout(function(){
//            floortimer = setInterval(rightButFunc,interval);
//        });
//    }
//    f1Tab();


    var interval = 2000; //自动轮播间隔
    var s = 600;  //淡出淡入时间
    var nowimg = 0;


    var floorLBtn1 = $('.floor_btnLeft1');  //左按钮
    var floorRBtn1 = $('.floor_btnRight1');  //右按钮
    floorLBtn1.click(leftButFunc);
    floorRBtn1.click(rightButFunc);
    var floortimer = setInterval(rightButFunc(".ul1"),interval); // 定时器


    //右按钮的业务函数：
    function rightButFunc(a) {
        var floorlis = $("."+a).children('li');
        if(!floorlis.is(":animated")){
            //老的信号量元素淡出
            floorlis.eq(nowimg).fadeOut(s);
            //信号量
            nowimg++;
            if (nowimg > floorlis.size() - 1) {
                nowimg = 0;
            }
            //新的信号量元素淡出
            floorlis.eq(nowimg).fadeIn(s);
        }
    }

    //左按钮的业务函数：
    function leftButFunc() {
        if(!floorlis.is(":animated")){
            //老的信号量元素淡出
            floorlis.eq(nowimg).fadeOut(s);
            //信号量
            nowimg--;
            if (nowimg < 0) {
                nowimg = floorlis.size() - 1;
            }
            //新的信号量元素淡出
            floorlis.eq(nowimg).fadeIn(s);
        }
    }

    // 鼠标浮上停止轮播
    $('.floor_moreBrand').mouseover(function(){
        clearInterval(floortimer);
    });
    $('.floor_moreBrand').mouseout(function(){
        floortimer = setInterval(rightButFunc,interval);
    });



    /*
     floor 小图鼠标浮上向上
     */
    $('.img_re').mouseover(function(){
        $(this).find('img').css('border-bottom','5px solid #ba2a7e');
        $(this).stop().animate({'margin-top':'-5px'},200);
    });
    $('.img_re').mouseout(function(){
        $(this).find('img').css({'border-bottom':''});
        $(this).stop().animate({'margin-top':'0'},200);
    })

});