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
//        alert("abc");
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
     正则处理
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
        console.log(reg1.test(userVal))
        console.log(reg2.test(userVal))
        console.log(reg3.test(userVal))

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

    $('#getcode').getcode(); //手机发送验证码，引入插件，调用方法
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