var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;

//一開始網頁元件載入之後要做的事情
$(document).ready(function() { 
    //遊戲地形設定
    //0：可走、1：障礙、2：終點、3：敵人
    mapArray = [0,1,1,0,0,0,3,1,2];
    ctx = $("#myCanvas")[0].getContext("2d");
    
    //擺上主角 - 使用預設位置
    imgMain = new Image();
    imgMain.src = "SimpleRPG/images/spriteSheet.png";
    currentImgMainX= 0;
    currentImgMainY= 0;
    imgMain.onload = function()
    {    
      ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    }
    
    //擺上障礙物與敵人
    imgMountain = new Image();//障礙物圖片物件
    imgMountain.src = "SimpleRPG/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "SimpleRPG/images/Enemy.png";
    imgMountain.onload = function()
    {
      imgEnemy.onload = function()
        {
            for(var x in mapArray)
            {
                if(mapArray[x]==1)
                {
                    //擺上山  為何x%3*200=x 因為
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
                } 
                 else if(mapArray[x]==3)
                {
                    //擺上敵人  為何x%3*200=y 因為y/3 得到0,1,2 取商數
                    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
                }
            }
         };  
    };
        
});

//有人按按鍵後要處理的動作下載這裡
$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    //targetImgMainX、targetImgMainY :主角即將要過去的目標位置
    //targetBlock :主角即將要移動過去的哪一個編號
    //cutImagePositionX :依據主角朝向什麼方向而決定的圖片
    event.preventDefault();
    //避免點擊鍵盤出現瀏覽器其他行為，如放大，scroll down
    //依使用者點擊按鍵，，計算出目標位置以及設定新的圖片
    //alert(event.which);
    
    switch(event.which){
        case 37://往左走
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case 38://往上走
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case 39://往right走
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40://往下走
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break;
        default://當有人按了這四個按鍵以外的狀況
            return;
    }
    
    if(targetImgMainX<=400 && targetImgMainX>=0 &&
                targetImgMainY<=400 && targetImgMainY>=0)//沒有超出邊界
    {
        targetBlock=targetImgMainX/200 + targetImgMainY/200*3;
    }
    else
    {
        targetBlock = -1; //-1代表異常，不移動
    }
    
    ctx.clearRect(currentImgMainX , currentImgMainY ,200,200);//清除主角原本所在位置
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
    {
        //目標位置異常、遇到障礙物、遇到敵人都不能走，就在原地（會轉頭方向）
    }
    else
    {
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
    
    switch(mapArray[targetBlock])
            {
                case undefined://牆壁
                    $("#talkBox").text("邊界");
                break;
                case 1://障礙
                    $("#talkBox").text("有山");
                break;
                case 2://終點
                    $("#talkBox").text("抵達終點！");
                break;
                case 3://有人
                    $("#talkBox").text("嗨～");
                break;
            }
    
});