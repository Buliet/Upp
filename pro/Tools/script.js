var tbody = document.getElementById("birth_animal");

var year = 1960
for (var count = 1; count <= 12; count++) {
    var trItem = document.createElement("tr");
    for (i = 1; i <= 12; i++) {
        var tdItem = document.createElement("td");
        var tdText = document.createTextNode(year);
        var year = year + 1
        tdItem.appendChild(tdText);
        trItem.appendChild(tdItem);
        tbody.appendChild(trItem);
    }
}