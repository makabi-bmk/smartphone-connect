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

// スクリーンをタッチしたとき
