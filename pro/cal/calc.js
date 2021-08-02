/*计算器实现*/

// Initialize the calculator
// 初始化写在js中而不是html中，方便以后维护
function init() {
    // 初始化文本框
    var num = document.getElementById("num");
    num.value = "0";
    num.disabled = "disabled";


    // 给按钮绑定点击事件处理器，点击按钮后文本框显示

    var buttons = document.getElementsByTagName("input");

    var num1;
    var num2;
    var ope;

    // 给按钮绑定事件处理器
    for (i in buttons) {
        buttons[i].onclick = function() {
            if (isNumber(this.value)) {
                if (isNull(num))
                    num.value = this.value;
                else
                    num.value = num.value + this.value;
            } else {
                var btn_val = this.value;

                switch (btn_val) {
                    case "c":
                        num.value = "0";
                        break;
                    case "+/-":
                        num.value = switchSign(num.value);
                        break;
                    case "←":
                        num.value = back(num.value);
                        break;
                    case "+":
                        num1 = num.value;
                        num.value = "0";
                        ope = "+";
                        break;
                    case "-":
                        num1 = num.value;
                        num.value = "0";
                        ope = "-";
                        break;
                    case "*":
                        num1 = num.value;
                        num.value = "0";
                        ope = "*";
                        break;
                    case "/":
                        num1 = num.value;
                        num.value = "0";
                        ope = "/";
                        break;
                    case "=":
                        num2 = num.value;
                        num.value = calc(ope, num1, num2);
                        break;
                    case ".":
                        num.value = appendDecimalPoint(num.value);
                        break;
                    default:
                        // statements_def
                        break;
                }
            }
        }
    }

}

// Back
function back(n) {
    if (!isNull(n)) {
        if (n.length > 1) {
            n = n.slice(0, n.length - 1);
        } else {
            n = "0";
        }
    }
    return n;
}

// Switch plus or minus
function switchSign(n) {
    // 字符串处理方式
    if (n.indexOf("-") == -1)
        n = "-" + n;
    else
        n = n.substring(1, n.length);
    return n;
}

// Append a decimal point
function appendDecimalPoint(n) {
    // if the number n don't contain a decimal point, Append it.
    if (n.indexOf(".") == -1) {
        n = n + ".";
        return n;
    }
}

// Arithmetic operations
function calc(ope, num1, num2) {

    num1 = Number(num1);
    num2 = Number(num2);
    switch (ope) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 == 0) {
                alert("The divisor mustn't be zero. Please retype!");
                return num1;
            }
            return num1 / num2;
        default:
            alert("The operation is not one of arithmetic operations!");
            break;
    }
}

// Determine if it's empty or zero.
function isNull(textBoxObj) {
    return textBoxObj.length == 0 || textBoxObj.value == "0";
}
// Determine if it's a number.
function isNumber(n) {
    return !isNaN(n);
}

// 给link按钮绑定事件处理器
function linkimooc() {

    var btn = document.getElementById("link");
    btn.onclick = function() {
        window.location.href = "https://www.imooc.com";
    }
}