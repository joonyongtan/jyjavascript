$(document).ready(function() { 
    //建立currentQuiz,儲存目前作答到第幾題
    var currentQuiz = null;
    //當按下按鈕后，要做的事情放在這裏面
    $("#startButton").click(function()
    {
        //如果還沒開始作答就從這裡開始
        if(currentQuiz==null)
        { 
            //設定目前作答到第0題
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //每次顯示選項前先將該區域清空（可以試著不做這一步）
            $("#options").empty();
            //將一個個選項內容，添加至選項區塊。x++三輪？
            for(var x=0;x<questions[0].answers.length;x++)
            {
                //input，name為option,x=第幾筆選項
                $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
            }
            $("#startButton").attr("value","Next");
        }
        else 
            //如果已經開始作答就從這裡繼續
        {         
            //巡訪每個選項是否有被選取
            $.each($(":radio"),function(i,val){
                if(val.checked)
                {
                 //使用者所選取的項目是否已產生最終結果(A~D) NaN means not a number
                 //兵分兩路:通往最終結果/跳向下一題題目
                    if(isNaN(questions[currentQuiz].answers[i][1]))
                    {     
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果的詳細內容
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                        //將目前作答到第幾題的變數清空
                        currentQuiz=null;
                        //修改按鈕為重新開始
                        $("#startButton").attr("value","重新開始");
                    }
                    else
                    { 
                        //alert("顯示下一題")
                      currentQuiz=questions[currentQuiz].answers[i][1]-1;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        for(var x=0;x<questions[currentQuiz].answers.length;x++)
                        {
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                        }
                    }
                 //完成後即可跳離回圈
                    return false;            
                }
         
                });
        }
    });
});