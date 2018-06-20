$(document).ready(function() { 
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    
    var topicCount = topic.length;
    
    var secondUnit = 1000;
    var minuteUnit = secondUnit * 60;
    var hourUnit = minuteUnit * 60;
    var dayUnit = hourUnit * 24;
    
    for(var x=0;x<topicCount;x++)
        {
            
        var thisTimeString=(new Date((startDate.getTime()+7*x*dayUnit))).toLocaleDateString();
        $("#courseTable").append("<tr>");
        $("#courseTable").append("<td>"+(x+1)+"</td>");
        $("#courseTable").append("<td>"+thisTimeString.slice(0,thisTimeString.length-5)+"</td>");
        //$("#courseTable").append("<td>"+thisTimeString+"</td>");
        //$("#courseTable").append("<td>"+typeof(startDate+7*x)+"</td>");
        $("#courseTable").append("<td>"+topic[x]+"</td>");
        $("#courseTable").append("</tr>");
        }
});