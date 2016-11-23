/**
 * Created by Administrator on 2016/11/6.
 */
$(function(){


    /*
     cookie获取
     */
    console.log(getCookie("username"));
    if(getCookie("username")){  //如果存在 kookie值，即获取
        $('.users').children('li').remove();
        $('.users').html(getCookie("username")+'!'+'<a class="tui" style="cursor: pointer;">退出</a>');
    }

    /*
     退出登录删除
     */
    $('.tui').click(function(){
        removeCookie("username");
        open('login.html');
    });



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
        logo 查看更多
     */

    var flag = false;
    $('.logo').find('a').click(function(){
        if(flag){
            $('.tupian').css('display', 'block');
            $('.text').css('display', 'none');
            $(this).html('更多>>');
            flag = false;
        }else{
            $('.tupian').css('display','none');
            $('.text').css('display','block');
            $(this).html('收起>>');
            flag = true;
        }
    });


    /*
     共找到商品的个数
     */
    var count = $('#yourLike').children('.yourLikeAny').length;  //寻找盒子里的子元素是 yourLikeAny的个数
    $('.findsum').html('共找到'+'<a>'+count+'</a>'+'个商品');


    /*
        新品上新 浮上状态
     */
    $('.choose1').find('span').mouseover(function(){
        $(this).find('b').css('color','#94193f');
        $(this).find('div').css('display','block');
        $(this).siblings('div').css('display','none');
    });
    $('.choose1').find('span').mouseout(function(){
        $(this).find('b').css('color','');
        $(this).find('div').css('display','none');
    })


    /*  物品列单 样式 调用方法*/
    moveTop('.yourLikeAny');

    /*  物品列单 样式方法*/
    function moveTop(id){
        $(id).mouseover(function(){
            $(this).css({'border-bottom':'3px solid #94193f'});
            $(this).find('img').stop().fadeTo('fast',0.7,function(){
                $(this).stop().animate({opacity:1});
            });
            $(this).stop().animate({'margin-top':'-5px'},100);
        })
        $(id).mouseout(function(){
            $(this).css({'border-bottom':''});
            $(this).find('img').css('opacity','1');
            $(this).stop().animate({'margin-top':''},100);
        });
    }



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