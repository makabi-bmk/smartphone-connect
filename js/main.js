const { sensorData } = require("./header");

const con = new WebSocket('ws://localhost:8081/');

var isCommunicatable = true;

window.onload = function() {
    try {
        con.onopen = function() {
            console.log('coを開始しました');
        };
    } catch (error) {
        console.log(error);
    }
    while (sensorData.smartphone_ID == 0) {
        sendData(1);
    }
};

con.onmessage = function(ms) {
    var receivedData = JSON.parse(ms.data);
    var request_num = receivedData["request_num"];
    isCommunicatable = true;

    console.log("res = " + ms.data);
    
    switch(request_num) {
        case 0:
            break;
        case 1:
            sensorData.smartphone_ID = receivedData["smartphone_ID"];
            alert("IDは" + sensorData.smartphone_ID + "です");
            var IDtext = document.getElementById("ID");
            IDtext.innerHTML = "ID : " + sensorData.smartphone_ID;
            break;

        case 2:
            var flag = receivedData["flag"];            
            if (flag & 1)   reset();
            else {
                if (flag & 2)   changeBackImage(receivedData["back_image_num"]);
                if (flag & 4)   changeImage(receivedData["image_num"]);
                if (flag & 8)   changeMessage(receivedData["message"]);
                if (flag & 16)  dispAlert(receivedData["alert_message"]);
                if (flag & 32)  playAudio(receivedData["bgm_num"]);
                if (flag & 64)  changeImagePosition(receivedData["pos_x"], receivedData["pos_y"]);
                if (flag & 128) changeImageSize(receivedData["size"]);
            }
            sensorData.scratch_ID = receivedData["scratch_ID"];
            sendData(2);
            break;
    }
};

function sendData(request_num) {
    if (isCommunicatable == false) return;

    sensorData.request_num = request_num;
    console.log('送るデータ:' + JSON.stringify(data));
    try {
        con.send(JSON.stringify(data));
        isCommunicatable = false;
    } catch (error) {
        console.log(error);
    }
} 

window.onbeforeunload = function(e) {
    e.returnValue = "ページを離れようとしています。よろしいですか？";
    con.close();
}