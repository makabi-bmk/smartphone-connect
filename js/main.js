const con = new WebSocket('ws://localhost:8081/');
var ID = 0;

var data = {
    ID : 0,
    request_code : 0,
    alpha : 0,
    beta : 0,
    gamma : 0,
    acceleration_x : 0,
    acceleration_y : 0,
    acceleration_z : 0,
    image_num  : 0,
    voice_message : "",
    tap_x : 0,
    tap_y : 0,
    swipe_vertical : false,
    swipe_horizontal : false,
    swipe_diagonal : false
};

window.onload = function() {

    try {
        con.onopen = function() {
            console.log('coを開始しました');
            sendData(0);
        };
    } catch (error) {
        console.log(error);
    }

    sendData(1);
    setInterval(sendSensorData, 1000);
};

con.onmessage = function(res) {
    var resList = JSON.parse(res.data);
    console.log("res = " + res.data);
    switch(resList['code']) {
        case 0:
            console.log("res = " + res.data);
            break;
        case 1:
            ID = resList['ID'];
            alert("IDは" + ID + "です");
            console.log('ID = ' + ID);
            
            var IDtext = document.getElementById("ID");
            IDtext.innerHTML = "ID : " + ID;

            break;
        case 2:
            var messageText = document.getElementById('message');
            messageText.innerHTML = resList['message'];
            break;
        
    }
};

// デバイスの方向の変化を検出したとき
window.addEventListener('deviceorientation', function(e) {
    data.alpha = e.alpha;
    data.beta = e.beta;
    data.gamma = e.gamma;
});

// デバイスの加速度の変化を検出したとき
  window.addEventListener('devicemotion', function(e) {
    data.acceleration_x = e.acceleration.x;
    data.acceleration_y = e.acceleration.y;
    data.acceleration_z = e.acceleration.z;
});

var sendSensorData = function() {
    sendData(2);
};

function sendData(code) {
    data.request_code = code;
    console.log('送るデータ:' + JSON.stringify(data));

    try {
        con.send(JSON.stringify(data));
        // con.close();
    } catch (error) {
        console.log(error);
    }
}