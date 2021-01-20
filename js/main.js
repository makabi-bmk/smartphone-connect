// const { REQUEST } = require("./header");

const con = new WebSocket('ws://localhost:8081/');
// const con = new WebSocket('http://34.83.48.34/smartpnone:8081')
var isCommunicatable = true;


window.onload = function() {

    resetAll();
    setScreenSize();
    document.getElementById("body").style.backgroundSize = screen.width + "px " + screen.height + "px";

    try {
        con.onopen = function() {
            console.log('coを開始しました');
        };
    } catch (error) {
        console.log("error:" + error);
        alert("接続でエラーが発生しました。もう一度サイトを読み込んでください。");
    }
    //ここ数秒おきにきくことにしよう
    sendData(REQUEST.getID);
};

con.onmessage = function(ms) {
    var receivedData = JSON.parse(ms.data);
    var request_num = receivedData[DATA_NAME.request_num];
    isCommunicatable = true;

    console.log("res = " + ms.data);

    switch(request_num) {
        case REQUEST.none:
            break;
        case REQUEST.getID:
            var status = receivedData["status"];

            if (status == 500) {
                alert(receivedData["message"]);
            } else {
                sensorData.smartphone_ID = receivedData[DATA_NAME.smartphone_ID];
                alert("IDは" + sensorData.smartphone_ID + "です");
                var IDtext = document.getElementById("ID");
                IDtext.innerHTML = "ID : " + sensorData.smartphone_ID;    
            }
            break;

        case REQUEST.connect:
            setInputText();
            sensorData.scratch_ID = receivedData[DATA_NAME.scratch_ID];
            sendData(REQUEST.connect);
            orderEvent(receivedData);
            resetTouch();
            break;
    }
};

function orderEvent(data) {
    var flag = data[DATA_NAME.flag];            
            if (flag & 1) resetAll();
            // else {
                if (flag & 2)    changeBackImage(data[DATA_NAME.back_image_num]);
                if (flag & 4)    changeImage(data[DATA_NAME.image_num]);
                if (flag & 8)    changeMessage(data[DATA_NAME.message]);
                if (flag & 16)   dispAlert(data[DATA_NAME.alert_message]);
                if (flag & 32)   playAudio(data[DATA_NAME.audio_num]);
                if (flag & 64)   changeImagePosition(data[DATA_NAME.position_x], data[DATA_NAME.position_y]);
                if (flag & 128)  changeImageSize(data[DATA_NAME.size]);
                if (flag & 256)  rotateImage(data[DATA_NAME.angle]);
                if (flag & 512)  changeButtonText(data[DATA_NAME.button_text]);
                if (flag & 1024) changeVisibility(data[DATA_NAME.view]);
            // }
}

function sendData(request_num) {
    if (isCommunicatable == false) return;

    sensorData.request_num = request_num;
    console.log('送るデータ:' + JSON.stringify(sensorData));
    try {
        con.send(JSON.stringify(sensorData));
        isCommunicatable = false;
    } catch (error) {
        console.log(error);
       alert("接続でエラーが発生しました。もう一度サイトを読み込んでください。");
    }
}

window.addEventListener("beforeunload", function(e) {
    sendData(REQUEST.close);
    con.close();
    //e.returnValue = "ページを移動します";
}, false);