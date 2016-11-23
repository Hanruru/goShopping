/**
 * Created by Master on 2016/10/27.
 */

$(function(){
    /*
     顶部导航
     */
    menuFixed("assortment");

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
        $("#index-banner").css("background",uls.background);
        $("#index-banner").stop().animate({backgroundColor:uls.eq($(this).index()).css('background-color')},500);
    })

    //鼠标移动到 banner上停止轮播，取消间歇，移除再恢复轮播
    $("#index-banner").hover(function () {
        clearInterval(timer);
    },function () {
        timer = setInterval(next,1500);
    })

    /*
     nav 导航的引入
     */
    $(".nav ul li").mouseenter(function(){  //鼠标移入
        $(this).addClass("cur");
        $(this).children(".zicaidan").show();
        $(this).children("s").show();
        $(this).css("background","-webkit-gradient(linear, 0% 0%, 100% 0%,from(#c8ae53), to(#ffffff)"); //颜色渐变
        $(this).find("a").css("color","#000000");
    });

    $(".nav ul li").mouseleave(function(){  //鼠标移出
        $(this).removeClass("cur");
        $(this).children(".zicaidan").hide();
        $(this).children("s").hide();
        $(this).css("background","");
        $(this).find("a").css("color","");
    });

    /* 立即抢购 倒计时*/
    var li=$(".current")[0];
    var start=$(".hoverLink");
    var endTime=new Date();
    endTime.setMinutes(endTime.getMinutes()+2);  //设置秒杀结束时间为 2分钟
    var timer=setInterval(function(){
        var nowTime=new Date();
        var str="距离秒杀结束还剩";
        var result=endTime.valueOf()-nowTime.valueOf();         //秒 使用 valueOf() 来取得此对象的原始值
        var hour=toTwo(Math.floor(result%(24*60*60*1000)/(60*60*1000)))+":";
        var minute=toTwo(Math.floor(result%(60*60*1000)/(60*1000)))+":";
        var second=toTwo(Math.floor(result%(60*1000)/(1000)))+":";
        var msecond=toTwo(Math.floor(result%(1000)/(10)));
        str=str.concat(hour,minute,second,msecond);  //拼接字符串
        li.innerHTML=str;

        if(result<=0){  //
            li.innerHTML="秒杀结束";
        }

    },20);

    start.on("click",function(){  //添加抢购点击事件
        if(li.innerHTML=="待抢购中"){   //
            alert("抢购还没开始");
        }else{
            $(this).html("抢购成功");
        }
        console.log(li.innerHTML);
    })

    function toTwo(num){  // 00:00:00:00  格式输出时间结果
        return num<10?"0"+num:num;
    }

    /*
     品牌特卖轮播 / tab  导入
     */
    var oTTSlider=document.getElementById('TTSlider');
    var oTTSliderTitle=getByClass('TTSliderTitle',oTTSlider,'div')[0];
    var aSubNav=oTTSliderTitle.getElementsByTagName('li');
    var oTTSliderPrevBtn=document.getElementById('TTSliderPrevBtn');
    var oTTSliderNextBtn=document.getElementById('TTSliderNextBtn');
    var oTTSliderPicList=getByClass('TTSliderPicList',oTTSlider,'div')[0];
    var aItem=oTTSliderPicList.getElementsByTagName('ul');
    var len=aItem.length;
    var showIndex=aItemImgWidth=iNow=0;
    var aEle=[];
    for(var i=0;i<len;i++)
    {
        var aItemImgs=aItem[i].getElementsByTagName('li');
        if(!aItemImgWidth)
        {
            aItemImgWidth=aItemImgs[0].offsetWidth;
        }
        aEle.push(aItemImgs);	//存入数组,考虑到有多个轮播,且每个轮播里面的图片个数可能一致.
        aSubNav[i].index=i;
        aSubNav[i].onmouseover=function()//切换
        {
            var index=showIndex=this.index;
            for(var j=0;j<len;j++)
            {
                if(j!=index)
                {
                    aItem[j].className='';
                    aSubNav[j].className='';
                }
            }
            aSubNav[index-1] && (aSubNav[index-1].className='noneBorRight' );
            if(index>0)
            {
                (aSubNav[0].getElementsByTagName('div')[0].style.borderLeft='1px solid #C3C5C7');
            }
            else
            {
                aSubNav[0].getElementsByTagName('div')[0].style.borderLeft='2px solid #C3C5C7';
            }

            aSubNav[index].className='cur';
            aItem[index].className='show';
        }
    }

    for(var i=0;i<len;i++)
    {
        var num=aEle[i].length;
        if(aItem[i].className=='show')
        {
            showIndex=i;
        }
        aItem[i].style.width=num*(aItemImgWidth)+'px'
    }
    oTTSliderNextBtn.onclick=function()
    {
        var maxNum=aEle[showIndex].length-1;
        aItem[showIndex].insertBefore(aEle[showIndex][maxNum],aEle[showIndex][0]);
        aItem[showIndex].style.left=-aItemImgWidth+'px';
        doMove(aItem[showIndex],0);
    }

    oTTSliderPrevBtn.onclick=function()
    {
        doMove(aItem[showIndex],-(aItemImgWidth),function(){
            aItem[showIndex].style.left=0;
            aItem[showIndex].appendChild(aEle[showIndex][0])
        });
    }

    function doMove(o,t,fn)
    {
        clearInterval(o.timer);
        o.timer=setInterval(function(){
            var is= (t-getStyle(o,'left'))/8;
            is= is>0?Math.ceil(is):Math.floor(is);
            if(t==o.offsetLeft)
            {
                clearInterval(o.timer);
                (typeof fn==='function') && fn();
            }
            else
            {
                o.style.left=o.offsetLeft+is+'px';
            }

        },30)
    }
    function getStyle(o,a)
    {
        return o.currentStyle ? parseFloat(o.currentStyle[a]) : parseFloat(getComputedStyle(o,false)[a]);
    }
    function getByClass(s,p,e)
    {
        var reg=new RegExp('(\\b)'+s+'(\\b)');
        var aElement=(p||document).getElementsByTagName(e||'*');
        var aResult=[];
        for(var i=0;i<aElement.length;i++)
        {
            reg.test(aElement[i].className) && aResult.push(aElement[i]);
        }
        return aResult;
    }

    /*
     我的圈子 引入
     */
    $(".tab .hd ul li").click(function(){
        $(".tab .bd .container").animate(
            {
                "left" : -210 * $(this).index()
            }
            ,
            1000
        );

        $(this).addClass("cur").siblings().removeClass("cur");
    });


    /*
     品牌样式轮播  引入方法
     */
    var imageAmount = $(".stage ul li").length;

    $(".stage ul li").clone().appendTo(".stage ul");

    var nowimg = 0;
    var $ul = $(".stage ul");
    var speed = 500;
    var intervalTime = 2000;

    function rightButFunc(){
        if(nowimg < imageAmount - 1){
            nowimg ++;
            $ul.animate({"left" : -110 * nowimg} , speed);
        }else{
            $ul.animate({"left" : -110 * imageAmount} , speed , function(){
                $(this).css("left",0);
            });
            nowimg = 0;
        }
    }

    var t = setInterval(rightButFunc , intervalTime);

    $(".stage").mouseenter(function(){
        clearInterval(t);
    })

    $(".stage").mouseleave(function(){
        clearInterval(t);
        t = setInterval(rightButFunc , intervalTime);
    })


    /* 猜你喜欢 鼠标移上状态 底边框改变 */
    $(".yourLikeAny").mouseover(function(){
        $(this).css({"margin-top":"-5px","border-bottom":"3px solid #94193f"});
        $(this).find("img").fadeTo("fast",0.7,function(){  //鼠标浮上 opacity从 0.7变为 1
            $(this).animate({opacity:"1"});
        })
//        console.log($(this).index());
    })
    $(".yourLikeAny").mouseout(function(){
        $(this).css({"margin-top":"0","border-bottom":"3px solid #CCCCCC"});
    })

    /*
      轮播下一页
    */
    function next(){
        uls.stop().animate({opacity:"0"},1500);  //所有样式都变为 0
        uls.eq(index).stop().animate({opacity:"1"},1500);  //当前opacity 为 1
        ols.eq(index).attr("class","active");
        ols.eq(index).siblings().attr("class","");
        $("#index-banner").animate({backgroundColor:uls.eq(index).css('background-color')},1500);  //jquery animate函数不能处理背景色渐变，需要使用jquery.color.js插件
        index++;
        if(index>=lastIndex){
            index = 0;
        }
    }

    /*
     顶部导航菜单固定
     */
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
});

