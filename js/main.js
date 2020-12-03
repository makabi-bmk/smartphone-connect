const con = new WebSocket('ws://localhost:8081/');

window.onload = function() {
    try {
        con.onopen = function() {
            console.log('coを開始しました');
        };
    } catch (error) {
        console.log(error);
    }
    sendData(1);
    setInterval(sendSensorData, 3000);
};

con.onmessage = function(message) {
    var response = JSON.parse(message.data);
    console.log("res = " + message.data);

    var request_num = response["request_num"];
    switch(request_num) {
        case 0:
            console.log("res = " + message.data);
            break;
        case 1:
            data.ID = response["ID"];
            alert("IDは" + data.ID + "です");
            console.log('ID = ' + data.ID);
            
            var IDtext = document.getElementById("ID");
            IDtext.innerHTML = "ID : " + data.ID;

            break;
        case 2:
            console.log("res = " + message);
            var flag = response["flag"];
            
            if (flag & 1)   reset();
            if (flag & 2)   changeBackImage(response["back_image_num"]);
            if (flag & 4)   changeImage(response["image_num"]);
            if (flag & 8)   changeMessage(response["message"]);
            if (flag & 16)  dispAlert(response["alert_message"]);
            if (flag & 32)  playAudio(response["bgm_num"]);
            if (flag & 64)  changeImagePosition(response["pos_x"], response["pos_y"]);
            if (flag & 128) changeImageSize(response["size"]);

            break;
        
    }
};

var sendSensorData = function() {
    sendData(2);
};

function sendData(code) {

    if (data.ID == 0) {
        data.request_num = 1;
    } else {
        data.request_num = code;
    }
    console.log('送るデータ:' + JSON.stringify(data));

    try {
        con.send(JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
} 

window.onbeforeunload = function(e) {
    e.returnValue = "ページを離れようとしています。よろしいですか？";
    con.close();
}