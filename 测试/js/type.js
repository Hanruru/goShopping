/**
 * Created by Master on 2016/11/2.
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
        放大镜 引入
     */
    $(".jqzoom").imagezoom();

    $("#thumblist li a").click(function(){
        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
        $(".jqzoom").attr('src',$(this).find("img").attr("mid"));
        $(".jqzoom").attr('rel',$(this).find("img").attr("big"));
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
        console.log(x);
    });

    //点击楼层导航的时候：
    $(".floornav ul li").click(function(){
        $("html,body").animate(
            {
                //往对应h3上跳：
                "scrollTop" : $('h2').eq($(this).index()).offset().top
            }
            ,1000
        );
    });

})