var resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", StartGame);
var radio = document.getElementsByName('GType');
radio.forEach(e => {
    e.addEventListener("click", StartGame);

});
var words = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple", "Black", "White"]

function getGameType() {
    // forEach()方法不返回值，只用来操作数据
    // 如果数组遍历的目的是为了得到返回值， 那么使用map() 方法， 否则使用forEach() 方法
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked)
            return radio[i].value;
    }
}

// 获取元素的颜色
function getButtonColor(button) {
    return button.style.color;
}

function getButtonBColor(button) {
    return button.style.backgroundColor;
}

function setButtonBcolor(button, red, green, blue) {
    // 设置元素属性
    button.setAttribute('style',
        // 背景颜色
        'background-color: rgb(' + red + ',' + green + ',' + blue + ');'
    );
}

function setButtoncolor(button, red, green, blue) {
    button.setAttribute('style',
        // 文本颜色
        'color: rgb(' + red + ',' + green + ',' + blue + ');'
    );
}

function setButtonWBcolor(button, color) {
    // 设置元素属性
    button.setAttribute('style',
        // 背景颜色
        'background-color: ' + color + ';'
    );
}

function setButtonWcolor(button, color) {
    button.setAttribute('style',
        // 文本颜色
        'color: ' + color + ';'
    );
}

function getRandomInt(max) {
    // 获取 0-max 随机整数 (四舍五入)
    return Math.round(Math.random() * max);
}

function changecolor(button, type = 0, GType = 'Color') {
    red = getRandomInt(255);
    green = getRandomInt(255);
    blue = getRandomInt(255);
    selected = getRandomInt(words.length - 1);
    if (GType === 'Color') {

        if (type == 0) {
            setButtonBcolor(button, red, green, blue);

        } else {
            setButtoncolor(button, red, green, blue);

        }
        return [red, green, blue]
    } else {
        if (type == 0) {
            setButtonWBcolor(button, words[selected]);

        } else {
            setButtonWcolor(button, words[selected]);
        }
        return words[selected];
    }
}

function StartGame() {
    var heading = document.getElementById('colorValue');
    var answerMessage = document.getElementById('answer');
    var GType = getGameType();
    // 响应内部设置为空
    answerMessage.innerHTML = '';

    var buttons = document.getElementsByClassName('colorButton');
    var answerButton = getRandomInt(buttons.length - 1);

    for (var i = 0; i < buttons.length; i++) {
        colors = changecolor(buttons[i], 0, GType);
        if (i == answerButton) {
            if (GType === 'Color') {
                heading.innerHTML = `(${colors[0]},${colors[1]},${colors[2]})`
                setButtoncolor(heading, colors[0], colors[1], colors[2]);
            } else {
                heading.innerHTML = colors;
                setButtonWcolor(heading, colors);
                var rcolor = getButtonColor(heading);
            }
        }
        // 增加颜色值判断 是否正确
        buttons[i].addEventListener('click', function() {
            var ccolor = getButtonBColor(this);
            if (this === buttons[answerButton] || ccolor === rcolor) {
                answerMessage.innerHTML = "Correct!";
                // TODO change body's backgound color too
            } else {
                answerMessage.innerHTML = "Wrong answer! Guess again!";
            }
        });
    }
}

StartGame();

var heading2 = document.getElementById('title');

setInterval("changecolor(heading2, 1)", 1000 * 1);
setInterval("changecolor(resetButton, 0)", 1000 * 1);