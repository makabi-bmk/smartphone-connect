const con = new WebSocket('ws://localhost:8081/');
var ID = 0;

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

        // con.onmessage = function(res) {
        //     var resList = JSON.parse(res.data);
        //     console.log("res = " + res.data);
        //     switch(resList['code']) {
        //         case 0:
        //             console.log(res.data);
        //             break;
        //         case 1:
        //             ID = resList['ID'];
        //             console.log('ID = ' + ID);
        //             break;
        //     }
        // };
        // con.close();
    } catch (error) {
        console.log(error);
    }
    sendData(1, data);
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
    }
};

/*
try {
    
    con.onopen = function() {
        console.log('coを開始しました');
        con.send('Hello WebSocket!');
    };
    // con.close();

} catch (error) {
    console.log(error);
}

con.onmessage = function(msg) {
    
    alert(msg.data);
    console.log(msg.data);
};
*/

var alpha = 0;
var beta = 0;
var gamma = 0;
var acceleration_x = 0;
var acceleration_y = 0;
var acceleration_z = 0;

// デバイスの方向の変化を検出したとき
window.addEventListener('deviceorientation', function(e) {
    /*
    console.log(e.alpha); // z軸 0 〜 360
    console.log(e.beta);  // x軸 -180 〜 180
    console.log(e.gamma); // y軸 -90 〜 90
    */
    alpha = e.alpha;
    beta = e.beta;
    gamma = e.gamma;
});

// デバイスの加速度の変化を検出したとき
  window.addEventListener('devicemotion', function(e) {
    /*
    console.log(e.acceleration.x); // x軸
    console.log(e.acceleration.y); // y軸
    console.log(e.acceleration.z); // z軸
    */
    acceleration_x = e.acceleration.x;
    acceleration_y = e.acceleration.y;
    acceleration_z = e.acceleration.z;
});

var sendSensorData = function() {
    
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