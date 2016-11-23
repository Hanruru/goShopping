/**
 * Created by Master on 2016/11/2.
 */
$(function(){

    /*
     cookie获取
     */
//    console.log(getCookie("username"));
    if(getCookie("username")){  //如果存在 kookie值，即获取
        $('.users').children('li').remove();
        $('.users').html(getCookie("username")+'!'+'<a class="tui" style="cursor: pointer;">退出</a>');
    }


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
        choose 选择（颜色/尺寸）
     */
    $('.choose ul li').click(function(){
        $(this).attr('class','borderActive');
        $(this).append($('<b></b>'));
        $(this).siblings().attr('class','');
        $(this).siblings().find('b').remove();
    });


    /*
        添加商品 数量
     */
    var num = parseInt($('.num').val());

    // 数量加
    $('.btn_add').click(function(){
        $('.num').val(++num);
    });

    // 数量减
    $('.btn_reduce').click(function(){
        if(num<=1){
            $('.num').val(1);
            $('.num').blur(function(){
                if($('.num').val()==0){  // 购物商品不能为 0
                    $('.num').val('1');
                }
            })

        }else{
            $('.num').val(--num);
        }
    });


    /*
        购物车动画效果
     */
    var count = [];
    $('#addCar').click(function(evt){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var fly = $('<div id="fly"></div>');
        var e = evt || window.event;
        var left = e.clientX;   //获取鼠标点击初始 left，top值
        var top = e.clientY+scrollTop;
        var lastX = $('.carimg').offset().left;  //右导航栏的购物车位置
        var lastY = $('.carimg').offset().top;
        var result=0;

//        console.log('x'+x+';'+'y'+y);
        fly.css({'left':left,'top':top,'width':100,'height':100}).stop().animate({'left':lastX,'top':lastY,'width':20,'height':20},800,function(){
            $('#fly').remove();
            count.push(num);
            for(var i=0;i<count.length;i++){
                result+=count[i];
            }
            $('.carnum').html(result);//先移动，后再给值
        });

        $('body').append(fly);


    });




    /*
        floor 楼层锚点
     */
    //窗口的事件：
    var $h2 = $('.floor').find('h2');
    var $floorLi = $(".floornav ul li");

    $(window).scroll(function(){
        var x = $(window).scrollTop();	//当前的卷动高度
        if(x < $h2.eq(1).offset().top - 300){
            $floorLi.eq(0).addClass("cur").siblings().removeClass("cur");
        }else if(x < $h2.eq(2).offset().top - 300){
            $floorLi.eq(1).addClass("cur").siblings().removeClass("cur");
        }else if(x < $h2.eq(3).offset().top - 300){
            $floorLi.eq(2).addClass("cur").siblings().removeClass("cur");
        }else if(x < $h2.eq(4).offset().top - 300){
            $floorLi.eq(3).addClass("cur").siblings().removeClass("cur");
        }else if(x >= $h2.eq(4).offset().top - 300){
            $floorLi.eq(4).addClass("cur").siblings().removeClass("cur");
        }
//        console.log(x);
    });

    //点击楼层导航的时候：
    $(".floornav ul li").click(function(){
        $("html,body").animate(
            {
                //往对应h2上跳：
                "scrollTop" : $('h2').eq($(this).index()).offset().top
            }
            ,1000
        );
    });




    /*
     右侧导航
     */
    //帐号
    $('.top1').hover(function(){
        $('.userho').css({'display':'block'});
    },function(){
        $('.userho').css({'display':'none'});
    });

    $('.close').click(function(){
        $(this).parent().css({'display':'none'});
    });


    //二维码状态
    $('.bot1').hover(function(){
        $('.erweimapo').css({'display':'block'});
    },function(){
        $('.erweimapo').css({'display':'none'});
    });

    //服务状态
    $('.bot2').hover(function() {
        $('.serviceho').css({'display': 'block'});
    },function(){
        $('.serviceho').css({'display': 'none'});
    });

    //滚动回顶部
    $('.bot3').click(function(){
        var speed = 500;
        $('body').animate({scrollTop:0},speed);
    });

});