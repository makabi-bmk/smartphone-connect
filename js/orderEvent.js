const { url } = require("inspector");

//画像を変更する
function changeImage(image_num) {
    document.getElementById("image").src = "../img/image" + image_num + ".png";
}

//背景画像を変更する
function changeBackImage(image_num) {
    document.getElementById("image").src = "../back_img/back_image" + image_num + ".png";
}

//画像の大きさを変更する(px)
function changeImageSize(size) {
    var img = document.getElementById("image");
    var orgWidth  = img.width;
    var orgHeight = img.height;
    img.width = size;
    img.height = orgHeight * (img.width / orgWidth);
}
