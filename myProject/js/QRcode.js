/**
 * Created by Master on 2016/11/8.
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
     退出登录删除
     */
    $('.tui').click(function(){
        removeCookie("username");
        open('login.html');
    });



    /*
        生成二维码 引用插件 jquery.qrcode.min.js
     */
    $('#code').qrcode({
//        text:"https://www.alipay.com/",
        text:"https://www.baidu.com/",
        width:230,  //设置 宽、高的值
        height:230
    });

})