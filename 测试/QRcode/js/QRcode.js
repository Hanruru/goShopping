/**
 * Created by Master on 2016/11/8.
 */
$(function(){

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