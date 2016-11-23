/**
 * Created by Master on 2016/10/26.
 */

/*
快速注册、登录添加点击事件进行切换
 */
$(function(){
    /*
    在登录界面 点击立即注册切换界面
     */
    $("#mes_register").click(function(){
        $("#message1").css("display","none");
        $("#message2").css("display","block");
    })
    /*
     在注册界面 点击立即登录切换界面
     */
    $("#mes_logo").click(function(){
        $("#message1").css("display","block");
        $("#message2").css("display","none");
    })
    /*
      登录    正则处理
        若不符合要求 css-hintWarn警告提示
    */

    /*
     user：邮箱/手机号/QQ号/昵称4-16位
         1.字母、数字、下划线组成，字母开头，4-16位。
         var reg1=/^[a-zA-Z]\w{4,16}$/;
         2. 验证手机号码 验证规则：11位数字，以1开头。
         var reg2=/^1\d{10}$/;
         3.验证邮箱   dF45.com@dffg.com
         var reg3=/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-])\.([a-zA-Z]{2,4})$/;
     */
    var flag1=false;
    $("#user").blur(function(){

        var reg1=/^[a-zA-Z]\w{3,15}$/;
        var reg2=/^1\d{10}$/;
        var reg3=/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.(com|cn|com.cn)$/;
        var userVal = $(this).val();

        if(reg1.test(userVal) || reg2.test(userVal) || reg3.test(userVal)){
            console.log(1)
//            $(".hint hint1").html("用户名合法");
            $(".hint1").html("用户名合法");
            console.log($(".hint1").html("用户名合法"))
            $(".hint1").removeClass("hintWarn");  //正确情况下删除hintWarn样式
            flag1=true;
        }else{
            $(".hint1").html("用户名不合法,请重新输入!");
//            $(".hint2").attr("class","hintWarn");  //会导致原先的错误样式一直覆盖，用 addClass()
            $(".hint1").addClass("hintWarn");   //错误情况下添加新样式
            flag1 = false;
        }
    })
    /*
     password:  6-20位
     var reg4 = /^\w{6,20}$/;
     */
    var flag2 = false;
    $("#password_Lo").blur(function(){
        var reg4 = /^\w{6,20}$/;
        var passwordVal=$(this).val();
        if(reg4.test(passwordVal)){
            $(".hint2").html("密码符合要求");
            $(".hint2").removeClass("hintWarn");
            flag2 = true;
        }else{
            $(".hint2").html("密码不符合要求");
            $(".hint2").addClass("hintWarn");
            flag2 = false;
        }
    })
    /*
    调用函数 生成验证码
     */
    var flag3 = false;
    $("#checkcode-box").html(createCode());
    $("#checkcode-box").on("click",function(){
        $(this).html(createCode());
    })
    /*
    判断输入的验证码是否和给出一样
     */
    $(".test").blur(function(){
        var checkcodeBox=$("#checkcode-box").html();
        var testVal=$(this).val();
        if(testVal==checkcodeBox){
            $(".hint3").html("验证码一致");
            $(".hint3").removeClass("hintWarn");
            flag3 = true;
        }else{
            $(".hint3").html("验证码不一致");
            $(".hint3").addClass("hintWarn");
            flag3 = false;
        }
    })

    /*
    如果登录中所有输入框都符合要求 ，跳转到主页
     */
    $("#login").on("click",function(){
        var remember=$("#remember-me")[0];
        if(flag1&&flag2&&flag3){
            var flag = remember.checked;   //设置checked属性
            var date = new Date();
            date.setDate(date.getDate()+10);
            if(flag){  //如果checked为 true 记录 kookie数据
                setCookie("username",$("#user").val(),date);
                setCookie("password",$("#password_Lo").val(),date);
            }
            open("index.html");
        }else{ }
    })

    /*
     注册   正则处理
     */
    /*
     手机号   以 1开头 第二个数：3|4|5|7|8  共11位
     var reg4 = /^1(3|4|5|7|8)\d{9}$/;
     */
    var flag4 = false;
    $("#iPhone").blur(function(){
        var reg4 = /^1(3|4|5|7|8)\d{9}$/;
        var iPhoneVal=$(this).val();
        if(reg4.test(iPhoneVal)){
            $(".hint4").html("手机号符合要求");
            $(".hint4").removeClass("hintWarn");
            flag4 = true;
        }else{
            $(".hint4").html("手机号不符合要求");
            $(".hint4").addClass("hintWarn");
            flag4 = false;
        }
    })

    /*
     第一个密码框判断
     onblur
     */
    var flag5 = false;
    var flag6 = false;
    var reg5 = /^\w{6,20}$/;
    $("#password").blur(function(){
        var str = $(this).val();
        var str2 = $("#rePassword").val();
        if(reg5.test(str)){
            $(".hint6").html("密码合法");
            $(".hint6").removeClass("hintWarn");
            flag5 = true;
        }else{
            $(".hint6").html("密码不合法");
            $(".hint6").addClass("hintWarn");
            flag5 = false;
        }
        if(str == str2){
            flag6 = true;
        }else{
            flag6 = false;
        }
    })
    /*
     第二个密码框判断
     onblur
     */
    $("#rePassword").blur(function(){
        var str1 = $("#password").val();
        var str2 = $(this).val();
        if(reg5.test(str2)){   //输出密码信息 清空原来的文档内容 改变字体
            if(str1 == str2){
                $(".hint7").html("密码一致").css({"color":"green","font-size":"12px"});
                $(".hint7").removeClass("hintWarn");
                flag6 = true;
            }else{
                $(".hint7").html("密码不一致").css({"color":"red","font-size":"12px"});
                $(".hint7").addClass("hintWarn");
                flag6 = false;
            }
        }else{
            $(".hint7").html("密码不合法").css({"color":"red","font-size":"12px"});
            $(".hint7").addClass("hintWarn");
            flag6 = false;
        }
    })
    /*
     第二个密码框判断 安全级别判断
     onkeyup
     */

    /*
     1 确定范围
     \w{6,20}
     2 \w{6,20}    数字字母下划线
     数字(纯字母，纯下划线)| 任意两个  |   三个都有
     [6,10]   低    1                低  2         低3
     [11-15]  低    4                中 5         中6
     [16-20]  低    7               中  8         高 9
     低
     reg123 /^\w{6,10}$/
     reg471 /^\d{11,20}$/
     reg472 /^[a-zA-Z]{11,20}$/
     reg473 /^_{11,20}$/
     高
     reg91 /\d{1,}/ig;
     reg92 /[a-zA-Z]{1,}/ig
     reg93 /_{1,}/ig
     reg94 /^\w{16,20}$/
     中
     else
     */
    $("#rePassword").keyup(function(){
        var level1 = $("#pwd-level-1");
        var level2 = $("#pwd-level-2");
        var level3 = $("#pwd-level-3");
        var reg123 = /^\w{6,10}$/;
        var reg471 = /^\d{11,20}$/;
        var reg472 = /^[a-zA-Z]{11,20}$/;
        var reg473 = /^_{11,20}$/;
        var reg91 = /\d{1,}/ig;
        var reg92 = /[a-zA-Z]{1,}/ig;
        var reg93 = /_{1,}/ig;
        var reg94 = /^\w{16,20}$/;
        var str = $(this).val();
        if(reg5.test(str)){
            if(reg123.test(str)||reg471.test(str)||reg472.test(str)||reg473.test(str)){
                level2.css("background","white");
                level3.css("background","white");
                level1.css("background","red");
            }else if(reg91.test(str)&&reg92.test(str)&&reg93.test(str)&&reg94.test(str)){
                level1.css("background","white");
                level2.css("background","white");
                level3.css("background","green");
            }else{
                level1.css("background","white");
                level3.css("background","white");
                level2.css("background","orange");
            }
        }else{
            level1.css("background","white");
            level2.css("background","white");
            level3.css("background","white");
        }
    })

    /*
     手机发送验证码，引入插件，调用方法
     */
    $('#getcode').getcode();

    /*
     点击注册按钮 进入新页面
     */
    $("#btnRgeister").on("click",function(){
        if(flag4 && flag5 && flag6){
            open("index.html");
        }
    })

    /*
     注册页调用验证码函数
     */
    $("#checkcode-box2").html(createCode());
    $("#checkcode-box2").on("click",function(){
        $(this).html(createCode());
    })

})

/*
随机生成验证码
 */
function createCode() {
    var arr = [0,1,2,3,4,5,6,7,8,9,
        "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var str = "";
    for(var i=1;i<=4;i++){
        var index = Math.round(Math.random()*(arr.length-1));
        str += arr[index];
    }
    return str;
}