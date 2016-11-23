/**
 * Created by Master on 2016/11/4.
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
        添加地址
     */
    $('.addAddress').click(function(){  //点击添加地址显示框
        $('.xinxi').css("display","block");
    });

    $('.xinxi').find('i').click(function(){  //  X 关闭填写信息框
        $('.xinxi').css("display","none");
    });

    showLocation();
    $('#submit').click(function(){
        var newName = $('#newName').val();  //拿name输入的值
        var newJuTi = $('#juti').val();  //具体详细地址
        var newIphone = $('#newIphone').val();  //手机号
        var newChoose = $('#loc_province').select2('data').text + ' - ' + $('#loc_city').select2('data').text + ' - ' +  $('#loc_town').select2('data').text;

        //  创建 div添加到地址栏
        var anyOne = $('<div class="anyone"><div class="name"><span>'+newName+'</span>(收)</div><div class="detiale">'+newChoose+newJuTi+'</div><div class="iphone">'+newIphone+'</div></div>');
        $('.all_address').append(anyOne);
        //  关闭填写信息框
        $('.xinxi').css("display","none");

    });



    /*
        付款方式
     */
    //点击动画
    $('.payTitle span').click(function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.payMain').siblings('.payMain').css('display','none');
        $('.payMain').eq($(this).index()).css('display','block');
    });



    /*
        结算打开新页面
     */
    $('.closing').click(function(){
        open('QRcode.html');
    });

});