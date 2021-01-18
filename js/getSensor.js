// const { sensorData } = require("./header");

window.onresize = setScreenSize;
function setScreenSize() {
    sensorData.screen_height = screen.height;
    console.log("height =  " + sensorData.screen_height);
    sensorData.screen_width = screen.width;
    console.log("weight = " + sensorData.screen_width);
}

function clickedButton() {
    console.log("ボタンが押された");
    sensorData.button_click = true;
}

function clickedImage() {
    console.log("オブジェクトが押された");
    sensorData.image_touch = true;
}

// 入力された文字を取得する
function setInputText() {
    sensorData.input_text = document.getElementById("input_text").value;
    console.log("入力された文字 = " + sensorData.input_text);
}

// デバイスの方向の変化を検出したとき
window.addEventListener('deviceorientation', function(e) {
    sensorData.alpha = e.alpha;
    sensorData.beta = e.beta;
    sensorData.gamma = e.gamma;
});

// デバイスの加速度の変化を検出したとき
window.addEventListener('devicemotion', function(e) {
    sensorData.acceleration_x = e.acceleration.x;
    sensorData.acceleration_y = e.acceleration.y;
    sensorData.acceleration_z = e.acceleration.z;
});

var touchStartX;
var touchStartY;
var touchMoveX;
var touchMoveY;

// スワイプの開始(タップ)
window.addEventListener("touchstart", function(event) {
    // 座標の取得
    touchStartX = sensorData.tap_position_x = event.touches[0].pageX;
    touchStartY = sensorData.tap_position_x = event.touches[0].pageY;
}, { passive: true });

// タップの移動
window.addEventListener("touchmove", function(event) {
    // 座標の取得
    touchMoveX = event.changedTouches[0].pageX;
    touchMoveY = event.changedTouches[0].pageY;
}, { passive: true });

// タップの終了時(スワイプの判定)
window.addEventListener("touchend", function(event) {
    if (touchStartX > touchMoveX && touchStartX > (touchMoveX + 50)) {
        //右から左に指が移動した場合
        sensorData.swipe_horizontal = true;
        console.log("右にスワイプ");
    } else if (touchStartX < touchMoveX && (touchStartX + 50) < touchMoveX) {
        //左から右に指が移動した場合
        sensorData.swipe_horizontal = true;
        console.log("左にスワイプ");
    }
    if (touchStartY > touchMoveY && touchStartY > (touchMoveY + 50)) {
        //上から下に指が移動した場合
        sensorData.swipe_vertical = true;
        console.log("下にスワイプ");
    } else if (touchStartY < touchMoveY && (touchStartY + 50) < touchMoveY) {
        //下から上に指が移動した場合
        sensorData.swipe_vertical = true;
        console.log("上にスワイプ");
    }
}, { passive: true });
