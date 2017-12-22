import $ from 'jquery';

var tourl='http://10.11.237.153:8080/WebApplication4/askForLeaveServlet';
var Common;
Common = {
    test: function (data1,successCallback) {

        console.log(JSON.parse(data1));
        $.ajax({
            type:"GET",
            url:tourl,
            data: JSON.parse(data1),
        success: function (data, textStatus, jqXHR) {
                console.log(data);
            successCallback(data.state)
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
//这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
            alert(XMLHttpRequest.responseText);
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus); // parser error;
        }
    });

        //
    },
    getData: function (data2,successCallback) {

        //console.log(JSON.parse(data2));
        $.ajax({
            url: tourl,
            type: 'GET',
            data:JSON.parse(data2),
            //timeout: 1000,

            beforeSend: LoadFunction, //加载执行方法
            error: erryFunction,  //错误执行方法
            success: succFunction //成功执行方法
        })
        function LoadFunction() {
            console.log("加载中....");
        }
        function erryFunction() {
            alert("error");
        }
        function succFunction(data) {

            //console.log(data);
            console.log("sssss");
            //eval将字符串转成对象数组
            var tt=eval(data);
            successCallback(tt);
            //return tt;
        }

    },

    examine: function (data2,successCallback) {

        //alert(data2);
        $.ajax({
            type:"GET",
            url:tourl,
            data: JSON.parse(data2),
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                successCallback(data.state)
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
//这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                alert(XMLHttpRequest.responseText);
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus); // parser error;
            }
        });

    },

};
module.exports =Common;