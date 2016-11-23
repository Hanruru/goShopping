/**
 * Created by Master on 2016/11/3.
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
        共找到商品的个数
     */
    var count = $('#yourLike').children('.yourLikeAny').length;  //寻找盒子里的子元素是 yourLikeAny的个数
    $('.findsum').html('共找到'+'<a>'+count+'</a>'+'个商品');


    /*  物品列单 样式 调用方法*/
    moveTop('.yourLikeAny');

    /*
        点击加载更多
     */
    var more = 1;
    $('.ui-button').click(function(){
        $.getJSON('../json/myStyle.json',function(response,status,xhr){
            if(status == 'success'){
                var arr = response;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].pageNo == more){
                        var list = arr[i].list;
                        for(var j=0;j<list.length;j++){
//                            var yourLikeAny = $('<div class="yourLikeAny"><img src='+list[j].url+'></div>');
                            var yourLikeAny = $('<div class="yourLikeAny">' +   //添加div
                                '<a href="#" class="LikeAnyImg"><img src='+list[j].url+'></a>' +
                                '<a class="likeAnyText">' + '<p>男士马丁靴冬季加绒真皮靴子英伦男靴短靴雪地靴保暖男鞋棉鞋棉靴</p>' +
                                '<span>' + '<img src="../images/remai.png">' + '<img src="../images/new.png">' + '</span>' +
                                '<h3>&yen;99.4</h3>' + '</a>' +'</div>');
                            $('#yourLike').append(yourLikeAny);
                            var count = $('#yourLike').children('.yourLikeAny').length;  //寻找盒子里的子元素是 yourLikeAny的个数
                            $('.findsum').html('共找到'+'<a>'+count+'</a>'+'个商品');

                            moveTop('.yourLikeAny');  //给创建出来的元素添加样式

//                            $('.yourLikeAny').click(function(){
//                                console.log($(this).index());
//                            })
                            if($('.yourLikeAny').index()%5==0){
                                $(this).css('clear','left');
                            }

                        }
                        more ++;
                        break;
                    }
                    if(arr[i].pageNo == '2'){
                        $('#addmore').find('input').val('加载完了');
                    }
                }
            }
        })
    });

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