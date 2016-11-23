/**
 * Created by Administrator on 2016/7/13.
 */
var ajax = {

    get: function (url, func) {
        var xhr = null;
        if (window.ActiveXObject) {
            var xhr = new ActiveXObject("Msxml2.XMLHTTP") || new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            var xhr = new XMLHttpRequest();
        }

        xhr.open("get", url, "true");//这里已经准备好发送了
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var str = xhr.responseText;
                //回调
                func(str);
            }
        }
    }
}