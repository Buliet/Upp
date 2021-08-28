var resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", StartGame);

function setButtonbcolor(button, red, green, blue) {
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

function getRandomInt(max) {
    // 获取 0-max 随机整数 (四舍五入)
    return Math.round(Math.random() * max);
}

function changecolor(button, type = 0) {
    red = getRandomInt(255);
    green = getRandomInt(255);
    blue = getRandomInt(255);
    if (type == 0) {
        setButtonbcolor(button, red, green, blue);

    } else {
        setButtoncolor(button, red, green, blue);

    }
    return [red, green, blue]
}

function StartGame() {
    var heading = document.getElementById('colorValue');
    var answerMessage = document.getElementById('answer');
    // 响应内部设置为空
    answerMessage.innerHTML = '';

    var buttons = document.getElementsByClassName('colorButton');
    var answerButton = getRandomInt(buttons.length - 1);

    for (var i = 0; i < buttons.length; i++) {
        colors = changecolor(buttons[i], 0);
        if (i == answerButton) {
            heading.innerHTML = `(${colors[0]},${colors[1]},${colors[2]})`
            setButtoncolor(heading, colors[0], colors[1], colors[2]);
        }
        buttons[i].addEventListener('click', function() {
            if (this === buttons[answerButton]) {
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