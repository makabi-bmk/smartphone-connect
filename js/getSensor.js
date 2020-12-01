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

//TODO: event.preventDefault()が動かないのと、縦方向のスワイプが検出できない
var touchStartX;
var touchStartY;
var touchMoveX;
var touchMoveY;

// スワイプの開始(タップ)
window.addEventListener("touchstart", function(event) {
    event.preventDefault();
    // 座標の取得
    touchStartX = data.tap_x = event.touches[0].pageX;
    touchStartY = data.tap_y = event.touches[0].pageY;
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
        data.swipe_horizontal = true;
    } else if (touchStartX < touchMoveX && (touchStartX + 50) < touchMoveX) {
        //左から右に指が移動した場合
        data.swipe_horizontal = true;
    }
    if (touchStartY > touchMoveY && touchStartY > (touchMoveY + 50)) {
        //上から下に指が移動した場合
        data.swipe_vertical = true;
    } else if (touchStartY < touchMoveY && (touchStartY + 50) < touchMoveY) {
        //下から上に指が移動した場合
        data.swipe_vertical = true;
    }
}, { passive: false });
