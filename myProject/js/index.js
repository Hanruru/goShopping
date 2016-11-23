/**
 * Created by Master on 2016/11/1.
 */
$(function(){
    /*
        cookie获取
     */
//    console.log(getCookie("username"));
    if(getCookie("username")){  //如果存在 kookie值，即获取
        $('.users').children('li').remove();
        $('.users').html(getCookie("username")+'!'+'<a class="tui" style="cursor: pointer;">退出</a>');
        //右侧导航用户
        $('.lname').html('用户:'+getCookie('username')+'!');
    }

    /*
        退出登录删除
     */
    $('.tui').click(function(){
        removeCookie("username");
        var login = $('<li><a href="login.html">登录</a></li><li>|</li><li><a href="login.html">注册</a></li><li>|</li>');
        $('.users').html(login);
        $('.lname').html('请登录');
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
        $("#index-banner").stop().animate({backgroundColor:uls.eq($(this).index()).css('background-color')},500);
    });

    //鼠标移动到 banner上停止轮播，取消间歇，移除再恢复轮播
    $("#index-banner").hover(function () {
        clearInterval(timer);
    },function () {
        timer = setInterval(next,1800);
    });

    /*
     轮播下一页
     */
    function next(){
        $("#index-banner").stop().animate({   //jquery animate函数不能处理背景色渐变，需要使用jquery.color.js插件
            backgroundColor:uls.eq(index).css('background-color')
        },1800);
        uls.eq(index).siblings().stop().animate({opacity:0},1800);
        uls.eq(index).stop().animate({opacity:1},1800);
        ols.eq(index).attr("class","active");
        ols.eq(index).siblings().attr("class","");
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
    });

    $(".bigimg").on({
        'mouseenter':function(){
            $(this).find('img').stop().animate({'width':'400px','height':'360px','margin-left':"0",'margin-top':'0'},500);
        },
        'mouseleave':function(){
            $(this).find('img').stop().animate({'width':'410px','height':'370px','margin-left':"-5px",'margin-top':'-5px'},500);
        }
    });


    /*
     logo 小轮播
     */
    var hotNum=0;
    $('#brand_Left_Btn').on('click',function(){  //点击一次向左移动 1090px;
        if(hotNum==($('#box ul').size()-1))return; //当达到 box里ul 的长度，返回禁止轮播
         hotNum++;
        $('#box').stop().animate({left:hotNum*(-1090)},800);
    });

    $('#brand_Right_Btn').on('click',function(){  //点击一次向右移动 1090px;
        if(hotNum==0)return;
          hotNum--;
        $('#box').stop().animate({left:hotNum*(-1090)},800);
    });



    /*
     floor 楼层 logo 呼吸轮播
     */

    //面向对象思维
    function Tab(id){
        //传入一个 id对象
        this.tab = $(id);
        // 创建左右按钮
        this.leftBtn = this.tab.find('.floor_btnLeft');
        this.rightBtn = this.tab.find('.floor_btnRight');
        this.lis = this.tab.find('li');
        this.curIndex = 0;  //给定参数初始值0
        var self = this;    //涉及到闭包，需要传递this

        this.leftBtn.click(function(){ //左按钮点击事件
            if(self.curIndex){  //边界处理
                self.curIndex--;
            }else{
                self.curIndex = self.lis.size()-1;
            }
            self.effects();
        });

        this.rightBtn.click(function(){ //右按钮点击事件
            self.curIndex++;
            self.curIndex = self.curIndex % self.lis.size();
            self.effects();
        });

        this.tab.hover(function(){  //鼠标浮上取消间歇
            clearInterval(self.timer);
        },function(){
            self.autoPlay();
        });

        this.autoPlay();
    }
    Tab.prototype.effects = function(){
        this.lis.hide();
        this.lis.eq(this.curIndex).show();
    };
    Tab.prototype.autoPlay = function(){
        var self = this;
        this.timer = setInterval(function(){ //每隔 1.5秒自动出发右击事件，实现轮播
            self.rightBtn.trigger('click');
        },1500)
    };

    var tab1 = new Tab('#tab1'); //楼层 1
    console.log(tab1);
    var tab2 = new Tab('#tab2');//楼层 2
    var tab3 = new Tab('#tab3');//楼层 3



    /*
     floor 小图鼠标浮上向上
     */
    $('.img_re').mouseover(function(){
        var color = $(this).parents('.floor').find('.floor_left').find('div:first').css("background-color");//获取对应颜色值
        $(this).find('img').css('border-bottom','5px solid '+ color);
        $(this).stop().animate({'margin-top':'-5px'},200);
    });
    $('.img_re').mouseout(function(){
        $(this).find('img').css({'border-bottom':''});
        $(this).stop().animate({'margin-top':'0'},200);
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
