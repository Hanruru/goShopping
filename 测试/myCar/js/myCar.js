/**
 * Created by Master on 2016/11/4.
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



    var btn=document.getElementById("btn");
    var list=document.getElementById("list");
    var close=document.getElementById("close");
    var say=document.getElementById("say");
    var chart=document.getElementById("chart");
    var name=document.getElementById("name");

    btn.onclick=function(){
        move(btn,{width:200},function(){
            list.style.width="200px";
            move(list,{height: 400});
        });
        if(name.value.length==0||say.value.length==0){

        }else{
            var url = "http://localhost:8080/ajaxtest02/chat?action=add&name="+name.value+"&say="+say.value;
            ajax.get(url);
            say.value="";
        }
    }
    close.onclick=function(){
        move(list,{height:0},function(){
            list.style.width="100px";
            move(btn,{width:100});
        });
    }

    say.onkeyup=function(evt){
        var e=evt|| window.event;
        if(e.ctrlKey&& e.keyCode=="13"){
            if(name.value.length==0||say.value.length==0){

            }else{
                var url = "http://localhost:8080/ajaxtest02/chat?action=add&name="+name.value+"&say="+say.value;
                ajax.get(url);
                say.value="";
            }
        }
    }

    var index=0;
    function read(){
        var url = "http://localhost:8080/ajaxtest02/chat?action=read&index="+index;
        function func(str){
            var obj=eval("("+str+")");
            var list=obj.list;
            index=obj.index;
            for(var i=0;i<list.length;i++){
                var li=document.createElement("li");
                li.innerHTML=list[i];
                chart.appendChild(li);
            }
        }
        ajax.get(url,func);
        setTimeout(read,1000);
    }
    read();


});