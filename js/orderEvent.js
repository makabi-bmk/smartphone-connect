// 画像の表示/非表示を切り替える
function changeVisibility(isVisiable) {
    var img = document.getElementById("image");
    if (isVisiable) {
        img.style.visibility = "visible";
    } else {
        img.style.visibility = "false";
    }
}

// 入力された文字を取得する
function setInputText() {
    var inputText = document.getElementById("input_text");
    sensorData.input_text = inputText.value;
}

// ボタンの文字を変更する
function changeButtonText(text) {
    if (text.length < MAX_BUTTON_TEXT_LENGTH) {
        document.getElementById("button").value = text;
    }
}

// 画像を回転する
function rotateImage(angle) {
    var img = document.getElementById("image");
    sensorData.angle = angle;
    img.style.transform = "rotate(" + angle + "deg)";
  }

// 画像を変更する
function changeImage(num) {
    var path = "./image/image" + num + ".png";
    if (0 <= num && num < IMAGE_NUM) {
        document.getElementById("image").src = path;
    }
}

// 背景画像を変更する
function changeBackImage(num) {
    var path = "./back_image/back_image" + num + ".png";
    if (0 <= num && num < BACK_IMAGE_NUM) {
        document.getElementById("body").style.backgroundImage = 'url("' + path + '")';
    }
}

// 画像の大きさを変更する(%)
function changeImageSize(size) {
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
    var image = document.getElementById("image");
    console.log("場所動かすよい");
    console.log("縦");
    if (posX >= 0) image.style.top = posX + "px";
    if (posY >= 0) image.style.left = posY + "px";
}

//吹き出しの文字を変更させる
function changeMessage(text) {
    var message = document.getElementById("message");
    if (text.length < MAX_MESSAGE_LENGTH) {
        message.innerHTML = text;
    }
}

//アラートを表示させる
function dispAlert(text) {
    if (text.length < MAX_ALERT_LENGTH) {
        alert(text);
    }
}

//音を鳴らす
//これならないかも
function playAudio(num) {
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
    changeImagePosition(100, 100);
    changeMessage("Hello World!");
}

function resetTouch() {
    sensorData.button_click     = false;
    sensorData.image_touch      = false;
    sensorData.swipe_vertical   = false;
    sensorData.swipe_horizontal = false;
}