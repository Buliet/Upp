var utext = document.getElementById('user_text');
var etext = document.getElementById('meme_text');
var upic = document.getElementById('user_picture');

var img = document.querySelector('img');

function updateText() {
    etext.innerHTML = utext.value;
}

function updatePicture() {
    var file = document.querySelector('input[type=file]').files[0];
    img.src = window.URL.createObjectURL(file);
    // 保存图片 目前只能使用 截图 来完成
}