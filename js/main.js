const con = new WebSocket('ws://localhost:8081/');
var ID = 0;

const SENSOR_FORMAT = {
    alpha : 0,
    beta : 0,
    gamma : 0,
    acceleration_x : 0,
    acceleration_y : 0,
    acceleration_z : 0
};

window.onload = function() {
    data = {};

    try {
        con.onopen = function() {
            console.log('coを開始しました');
            data['code'] = 0;
            console.log("送るデータ = " + JSON.stringify(data));
            con.send(JSON.stringify(data));
            // sendData(0, data);
        };
        // con.close();
    } catch (error) {
        console.log(error);
    }
    sendData(1, data);

    setInterval(sendSensorData, 100);
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
            break;
        case 2:
            console.log("データを送った");
            break;

    }
};

var alpha = 0;
var beta = 0;
var gamma = 0;
var acceleration_x = 0;
var acceleration_y = 0;
var acceleration_z = 0;

// デバイスの方向の変化を検出したとき
window.addEventListener('deviceorientation', function(e) {
    alpha = e.alpha;
    beta = e.beta;
    gamma = e.gamma;
});

// デバイスの加速度の変化を検出したとき
  window.addEventListener('devicemotion', function(e) {
    acceleration_x = e.acceleration.x;
    acceleration_y = e.acceleration.y;
    acceleration_z = e.acceleration.z;
});

var sendSensorData = function() {
    var data = {
        'alpha': alpha,
        'beta' : beta,
        'gamma' : gamma,
        'acceleration_x' : acceleration_x,
        'acceleration_y' : acceleration_y,
        'acceleration_z' : acceleration_z
    };
    sendData(2, data);
};

function sendData(code, data) {
    data['code'] = code;
    data['ID'] = ID;
    console.log('送るデータ:' + JSON.stringify(data));

    try {
        con.send(JSON.stringify(data));
        // con.close();
    } catch (error) {
        console.log(error);
    }
}