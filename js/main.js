const con = new WebSocket('ws://localhost:8081/');
var ID;

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

// デバイスの方向の変化を検出したとき
window.addEventListener('deviceorientation', function(e) {
    console.log(e.alpha); // z軸 0 〜 360
    console.log(e.beta);  // x軸 -180 〜 180
    console.log(e.gamma); // y軸 -90 〜 90
});

// デバイスの加速度の変化を検出したとき
  window.addEventListener('devicemotion', function(e) {
    console.log(e.acceleration.x); // x軸
    console.log(e.acceleration.y); // y軸
    console.log(e.acceleration.z); // z軸
});