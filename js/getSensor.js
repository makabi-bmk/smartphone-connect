$('document').on('click', '#button', function(evt) {
    // メニューを開いたり閉じたりする処理
    console.log("オブジェクトが押された");
    sensorData.image_touch = true;
});

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
    console.log("さわった");
    //event.preventDefault();
    // 座標の取得
    touchStartX = sensorData.tap_position_x = event.touches[0].pageX;
    touchStartY = sensorData.tap_position_x = event.touches[0].pageY;

    // 触った要素の判定
    var target = document.elementFromPoint(touchStartX, touchStartY);
    console.log("target = " + target.id);
}, { passive: true });

// タップの移動
window.addEventListener("touchmove", function(event) {
    //event.preventDefault();
    console.log("うごいた");
    // 座標の取得
    touchMoveX = event.changedTouches[0].pageX;
    touchMoveY = event.changedTouches[0].pageY;
}, { passive: true });

// タップの終了時(スワイプの判定)
window.addEventListener("touchend", function(event) {
    console.log("はなした");
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
