var imageSize = 60;
var imageAngle = 0;

// オブジェクトをタッチされたとき
function clickedImage() {
    sensorData.image_touch = true;
}

// オブジェクトの位置を検知する
function setImagePosition() {
    var img = document.getElementById("image");
    var clientRect = img.getBoundingClientRect();
    sensorData.position_x = window.pageXOffset + clientRect.left;
    sensorData.position_y = window.pageYOffset + clientRect.top;
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

//TODO: event.preventDefault()が動かないのと、縦方向のスワイプが検出できない
var touchStartX;
var touchStartY;
var touchMoveX;
var touchMoveY;

// スワイプの開始(タップ)
window.addEventListener("touchstart", function(event) {
    event.preventDefault();
    // 座標の取得
    touchStartX = sensorData.tap_position_x = event.touches[0].pageX;
    touchStartY = sensorData.tap_position_x = event.touches[0].pageY;
}, { passive: false });

// タップの移動
window.addEventListener("touchmove", function(event) {
    event.preventDefault();
    // 座標の取得
    touchMoveX = event.changedTouches[0].pageX;
    touchMoveY = event.changedTouches[0].pageY;
}, { passive: false });

// タップの終了時(スワイプの判定)
window.addEventListener("touchend", function(event) {
    if (touchStartX > touchMoveX && touchStartX > (touchMoveX + 50)) {
        //右から左に指が移動した場合
        sensorData.swipe_horizontal = true;
    } else if (touchStartX < touchMoveX && (touchStartX + 50) < touchMoveX) {
        //左から右に指が移動した場合
        sensorData.swipe_horizontal = true;
    }
    if (touchStartY > touchMoveY && touchStartY > (touchMoveY + 50)) {
        //上から下に指が移動した場合
        sensorData.swipe_vertical = true;
    } else if (touchStartY < touchMoveY && (touchStartY + 50) < touchMoveY) {
        //下から上に指が移動した場合
        sensorData.swipe_vertical = true;
    }
}, { passive: false });
