var box_input = document.getElementById('view');
var box_result = document.getElementById('result');

function set_input_value(value) {
    if (value == '=') {
        box_result.value = eval(box_input.value);
    } else if (value == 'C') {
        box_input.value = "";
        box_result.value = "";
    } else {
        box_input.value = (box_input.value == '0') ? value : box_input.value + value;
    }
}

// 监听函数传定参,,, 另一种 监听函数不传参 待测试效果
// var outvar = "bb";
// elem.addEventListener("click", function() {
//     var aa = outvar;

//     function() { console.log(aa); }
// })

// for 循环中 监听函数传变参 -closure 函数
var buttons = document.getElementsByClassName('button')
for (var i = 0; i < buttons.length; i++) {
    var text = buttons[i].innerText;
    buttons[i].addEventListener("click", function(tmp) {
        return function() { set_input_value(tmp) };
    }(text));
}

function keyDown() {
    var keycode = event.keyCode;
    if (keycode == 13) {
        set_input_value("=");
    }
}