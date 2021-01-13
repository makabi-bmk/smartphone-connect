module.exports.TYPE = {
    smartphone : 0,
    scratch : 1
};

module.exports.REQUEST = {
    none : 0,
    getID : 1,
    connect : 2
};

module.exports.DATA_NAME = {
    request_num : "request_num",
    smartphone_ID : "smartphone_ID",
    scratch_ID : "scratch_ID",
    type : "type",
    alpha : "alpha",
    beta : "beta",
    gamma : "gamma",
    angle : "angle",
    size : "size",
    position_x : "position_x",
    position_y : "position_y",
    acceleration_x : "acceleration_x",
    acceleration_y : "acceleration_y",
    acceleration_z : "acceleration_z",
    image_num : "image_num",
    back_image_num : "back_image_num",
    input_text : "input_text",
    button_text : "button_text",
    voice_message : "voice_message",
    tap_position_x : "tap_position_x",
    tap_position_y : "tap_position_y",
    button_click : "button_click",
    image_touch : "image_touch",
    swipe_vertical : "swipe_vertical",
    swipe_horizontal : "swipe_horizontal",
    flag : "flag",
    message : "message",
    alert_message : "alert_message",
    view : "view",
    audio_num : "audio_num"
};

module.exports.sensorData = {
    request_num : 0,
    smartphone_ID : 0,
    scratch_ID : 0,
    type : 0,
    alpha : 0,
    beta : 0,
    gamma : 0,
    angle : 0,
    size: 100,
    position_x : 0,
    position_y : 0,
    acceleration_x : 0,
    acceleration_y : 0,
    acceleration_z : 0,
    image_num  : 0,
    input_text : "",
    voice_message : "",
    tap_position_x : 0,
    tap_position_y : 0,
    button_click : false,
    image_touch : false,
    swipe_vertical : false,
    swipe_horizontal : false,    
};

module.exports.orderData = {
    request_num : 0,
    smartphone_ID : 0,
    scratch_ID : 0,
    type : 1,
    flag : 0,
    angle : 0,
    size : 0,
    image_num : 0,
    back_image_num : 0,
    size : 100,
    position_x : 0,
    position_y : 0,
    message : "",
    alert_message : "",
    button_text : "",
    view : true,
    audio_num : 0,
    tap_position_x : 0,
    tap_position_x : 0
};