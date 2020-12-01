//TODO: イベントを発生させた後フラグを0に戻す

//画像を変更する
function changeImage(image_num) {
    document.getElementById("image").src = "../image/image" + image_num + ".png";
}

//背景画像を変更する
function changeBackImage(image_num) {
    document.getElementById("image").src = "../back_image/back_image" + image_num + ".png";
}

//画像の大きさを変更する(px)
//TODO: ここpxじゃだめなんだよ～～%がいいよね～～～
function changeImageSize(size) {
    var img = document.getElementById("image");
    var orgWidth  = img.width;
    var orgHeight = img.height;
    img.width = size;
    img.height = orgHeight * (img.width / orgWidth);
}

//画像の場所を移動させる
function changeImagePosition(x, y) {
    var img = document.getElementById("image");
    img.style.position = "absolute";
    img.style.top = x + "px";
}
function changeImagePositionX(x) {
    var img = document.getElementById("image");
    img.style.position = "absolute";
    img.style.top = x + "px";
}
function changeImagePositionY(y) {
    var img = document.getElementById("image");
    img.style.position = "absolute";
    img.style.left = y + "px";   
}

//吹き出しの文字を変更させる
function changeMessage(text) {
    var message = document.getElementById("message");
    message.innerHTML = text;
}

//アラートを表示させる
function dispAlert(text) {
    alert(text);
}

//音を鳴らす
//これならないかも
function playAudio(bgmNum) {
    var bgmName = "../audio/audio" + bgmNum + ".mp3";
    var bgm = new Audio(bgmName);
    bgm.play();
}

//全ての設定をリセットする
function reset(clientID) {
    data.alpha = 0;
    data.beta = 0;
    data.acceleration_x = 0;
    data.acceleration_y = 0;
    data.acceleration_z = 0;
    data.image_num = 0;
    data.voice_message = "";
    data.tap_x = 0;
    data.tap_y = 0;
    data.image_touch = false;
    data.swipe_vertical = false;
    data.swipe_horizontal = false;

    changeBackImage(0);
    changeImage(0);
    changeImageSize(70);
    changeMessage("Hello World!");

}