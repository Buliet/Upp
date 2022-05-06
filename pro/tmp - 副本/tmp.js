    /* 就是不能共存呗 */
    // 计时
    var timele = document.getElementById("time");
    var tmele = document.createElement("span"),
        tsele = document.createElement("span"),
        tmsele = document.createElement("span");
    tmele.setAttribute("id", "id_M");
    tsele.setAttribute("id", "id_S");
    tmsele.setAttribute("id", "id_MS");
    timele.appendChild(tmele);
    timele.appendChild(tsele);
    timele.appendChild(tmsele);
    var count = 0;
    var id_M = document.getElementById("id_M");
    var id_S = document.getElementById("id_S");
    var id_MS = document.getElementById("id_MS");
    var ms = new Date().getTime();
    timer = setInterval(function() {
        count = new Date().getTime() - ms;
        id_M.innerText = handleTime1(parseInt(count / 1000 / 60)) + ":";
        id_S.innerText = handleTime1(parseInt(count / 1000 % 60)) + ":";
        id_MS.innerText = handleTime2(count % 1000);
        var timele2 = document.getElementById("time2");
        if (timele2)
            clearInterval(timer);

    }, 103);

    //
    /* 处理时间(分、秒) */
    function handleTime1(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }
    /* 处理时间(毫秒) */
    function handleTime2(num) {
        if (num < 10) {
            return "00" + num;
        } else if (num < 100) {
            return '0' + num;
        }
        return num;
    }