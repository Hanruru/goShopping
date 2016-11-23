 /**
 * Created by Master on 2016/10/9.
 */
/*
设置cookie
参数列表

 */
function setCookie(name,value,date,path,domain,secure) {
    //var document.cookie =
    var str = "";
    if(name==""||value==""){

    }else{
        str +=encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(date instanceof Date){
            str += ";expires="+date;
        }
        if(path){
            str += ";path="+path;
        }
        if(domain){
            str += ";domain="+domain;
        }
        if(secure){
            str += ";secure";
        }
    }
    document.cookie = str;
}

/*
获取cookie
参数列表
 */
function getCookie(name) {//"username"
    var str = document.cookie;//username=admin; password=123456
    var reg = /\s/ig;
    str = str.replace(reg,"");//username=admin;password=123456
    var arr = str.split(";");//["username=admin","password=123456"]
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split("=");//["username","admin"];
        if(arr2[0] == encodeURIComponent(name)){//encodeURIComponent编码
            return decodeURIComponent(arr2[1]);//decodeURIComponent解码
        }
    }
    return "";
}
/*
移除cookie
 */
function removeCookie(name) {
    document.cookie = name+"=1"+new Date();
}
