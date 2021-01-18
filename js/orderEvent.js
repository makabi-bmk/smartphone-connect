// const { sensorData } = require("./header");

// 画像の表示/非表示を切り替える
function changeVisibility(isVisiable) {
    console.log("オブジェクトの表示:" + isVisiable);
    var img = document.getElementById("image");
    if (isVisiable) {
        img.style.visibility = "visible";
    } else {
        img.style.visibility = "false";
    }
}

// ボタンの文字を変更する
function changeButtonText(text) {
    console.log("ボタンの文字:" + text);
    if (text.length < MAX_BUTTON_TEXT_LENGTH) {
        document.getElementById("button").innerHTML = text;
    }
}

// 画像を回転する
function rotateImage(angle) {
    console.log("回転:" + angle);
    var img = document.getElementById("image");
    sensorData.angle = angle;
    img.style.transform = "rotate(" + angle + "deg)";
  }

// 画像を変更する
function changeImage(num) {
    console.log("画像:" + num);
    var path = "./image/image" + num + ".png";
    if (0 <= num && num < IMAGE_NUM) {
        document.getElementById("image").src = path;
    }
}

// 背景画像を変更する
function changeBackImage(num) {
    console.log("背景画像:" + num);
    var path = "./back_image/back_image" + num + ".png";
    if (0 <= num && num < BACK_IMAGE_NUM) {
        document.getElementById("body").style.backgroundImage = 'url("' + path + '")';
    }
}

// 画像の大きさを変更する(%)
function changeImageSize(size) {
    console.log("大きさ:" + size);
    var image = document.getElementById("image");
    if (0 < size && size < MAX_SIZE) {
        image.style.width = size + "%";
        sensorData.size = size;
    }
}

// 画像の場所を移動させる
// 片方の値のみしか移動させたくない場合は-1が代入される
// TODO: ここ上限値決める
function changeImagePosition(posX, posY) {
    console.log("移動:x" + posX + ", y" + posY);
    var image = document.getElementById("image");
    if (posX >= 0) {
        image.style.top = posX + "px";
        sensorData.position_x = posX;
    }
    if (posY >= 0) {
        image.style.left = posY + "px";
        sensorData.position_y = posY;
    }
}

//吹き出しの文字を変更させる
function changeMessage(text) {
    console.log("吹き出し:" + text);
    var message = document.getElementById("message");
    if (text.length < MAX_MESSAGE_LENGTH) {
        message.innerHTML = text;
    }
}

//アラートを表示させる
function dispAlert(text) {
    console.log("アラート:" + text);
    if (text.length < MAX_ALERT_LENGTH) {
        alert(text);
    }
}

//音を鳴らす
//これならないかも
function playAudio(num) {
    console.log("音:" + num);
    var name = "../audio/audio" + num + ".mp3";
    var audio = new Audio(name);
    audio.play();
}

//全ての設定をリセットする
function resetAll() {
    resetTouch();

    changeVisibility(true);
    setInputText("");
    changeButtonText("ボタン");
    rotateImage(DEFAULT_ANGLE);
    changeImage(DEFAULT_SIZE);
    changeBackImage(0);
    changeImageSize(60);
    changeImagePosition(DEFAULT_POS_Y, DEFAULT_POS_X);
    changeMessage("Hello World!");
}

function resetTouch() {
    sensorData.button_click     = false;
    sensorData.image_touch      = false;
    sensorData.swipe_vertical   = false;
    sensorData.swipe_horizontal = false;
}