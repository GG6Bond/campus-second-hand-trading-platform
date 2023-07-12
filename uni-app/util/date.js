function FormatTime(t,date){
    var date=new Date(date);
    var o = {   
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };   
    if(/(y+)/.test(t)){
        t=t.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length)); 
    };    
    for(var k in o){
        if(new RegExp("("+ k +")").test(t)){
            t=t.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+ o[k]).substr((""+o[k]).length))); 
        }; 
    }
    return t; 
};
var time = FormatTime('yyyy-MM-dd hh:mm:ss', '2020-07-31T16:00:00.000Z')

// console.log(time)