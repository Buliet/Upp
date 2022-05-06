var odinput = document.getElementById('OD')
var wdinput = document.getElementById('WD')
var idinput = document.getElementById('ID')
var clear_btn = document.getElementById('clear_btn')
var result_btn = document.getElementById('result_btn')

var form = document.getElementById("form");

form.addEventListener('submit', (event) => {
    // 屏蔽默认提交, 默认触发最靠近的 button-submit
    event.preventDefault()
    // get_result()
})


clear_btn.addEventListener('click', (event) => {
    clear_value()
})

result_btn.addEventListener('click', (event) => {
    get_result()
})


function clear_value() {
    odinput.value = '';
    wdinput.value = '';
    idinput.value = '';
}

function get_result() {
    console.log(odinput.value)
    console.log(wdinput.value)
    console.log(wdinput.value * 2)
    console.log(idinput.value)
    var i = 0;
    if (odinput.value != '') i++;
    if (wdinput.value != '') i++;
    if (idinput.value != '') i++;
    if (i == 2) {
        // *1 ???
        if (odinput.value == '') odinput.value = idinput.value * 1 + wdinput.value * 2
        if (wdinput.value == '') wdinput.value = (odinput.value - idinput.value) / 2
        if (idinput.value == '') idinput.value = odinput.value - wdinput.value * 2
    }
}