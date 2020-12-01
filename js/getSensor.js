var data = {
    ID : 0,
    type : 0,
    request_num : 0,
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
    image_touch : false,
    swipe_vertical : false,
    swipe_horizontal : false,
    swipe_diagonal : false
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

/*

画面と画像のタッチがうごかん！！！！！！！！！！！！ないた！！！

*/

//画面をタッチしたとき
/*
var body = document.getElementById("body");
body.addEventListener("touchstart", function(event) {
    data.tap_x = event.changedTouches[0].pageX;
    data.tap_y = event.changedTouches[0].pageY;
}, false);

// 画像をタッチしたとき
var image = document.getElementById("robot_image");
image.addEventListener("touchstart", function(event) {
    //TODO: このフラグあとでfalseにする処理かく
    data.image_touch = true;
    /*
    data.tap_x = event.changedTouches[0].pageX;
    data.tap_y = event.changedTouches[0].pageY;
    
}, false);
*/

window.addEventListener("load", function(event) {
    var touchStartX;
    var touchStartY;
    var touchMoveX;
    var touchMoveY;
 
    // 開始時
    window.addEventListener("touchstart", function(event) {
    event.preventDefault();
    // 座標の取得
    touchStartX = data.tap_x = event.touches[0].pageX;
    touchStartY = data.tap_y = event.touches[0].pageY;
    }, false);
 
    // 移動時
    window.addEventListener("touchmove", function(event) {
    event.preventDefault();
    // 座標の取得
    touchMoveX = event.changedTouches[0].pageX;
    touchMoveY = event.changedTouches[0].pageY;
    }, false);
 
    // 終了時
    window.addEventListener("touchend", function(event) {
    // 移動量の判定
    if (touchStartX > touchMoveX) {
        if (touchStartX > (touchMoveX + 50)) {
        //右から左に指が移動した場合
        data.swipe_horizontal = true;
        }
    } else if (touchStartX < touchMoveX) {
        if ((touchStartX + 50) < touchMoveX) {
        //左から右に指が移動した場合
        data.swipe_horizontal = true;
        }
    }
    }, false);
}, false);