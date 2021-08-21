// 添加 TODO
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

function addToDoItem() {

    console.log("addToDoItem button clicked")

    var itemText = toDoEntryBox.value;
    // 添加后清空 已输入文本
    toDoEntryBox.value = '';
    newToDoItem(itemText, false);
}

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

//enter键-响应
function keyDown() {
    var keycode = event.keyCode;
    if (keycode == 13) //回车键是13
    {
        addToDoItem(); //回车后的响应函数
    }
}

// 清空已完成
var clearcompletedbutton = document.getElementById("clear-completed-button");
clearcompletedbutton.addEventListener("click", clearCompletedToDoItems);

function clearCompletedToDoItems() {

    console.log("clearCompletedToDoItems button clicked")
    // 增加 风险操作确认
    var IsSure = confirm("确认清空已完成?");
    if (IsSure) {
        var completedItems = toDoList.getElementsByClassName("completed");

        while (completedItems.length > 0) {

            completedItems.item(0).remove();

        }
    }
    // else {
    //     alert("已取消");
    // }
}

// 清空所有
var emptybutton = document.getElementById("empty-button");
emptybutton.addEventListener("click", emptyList);

function emptyList() {

    console.log("emptylist button clicked")
    var IsSure = confirm("确认清空所有?");
    if (IsSure) {

        var toDoItems = toDoList.children;

        while (toDoItems.length > 0) {

            toDoItems.item(0).remove();

        }
    }
    // else {
    //     alert("已取消");
    // }
}

// 手动保存
var savebutton = document.getElementById("save-button");
// 通过 匿名函数 给监听函数 传参
savebutton.addEventListener("click", function() { saveList(1) });

function saveList(stype = 0) {
    console.log("saveList: " + stype.toString());
    var toDos = [];
    for (var i = 0; i <
        toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);
        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

// 自动保存
function autosave() {
    console.log("auto save...");
    saveList(0);
}

// 载入已保存数据
function loadList() {
    console.log("loadList button clicked")
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for (var i = 0; i < toDos.length; i++) {

            var toDo = toDos[i];

            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

// 未完成转换已完成
function toggleToDoItemState() {
    this.classList.contains("completed") ? this.classList.remove("completed") : this.classList.add("completed");
}

// 首次加载历史数据
loadList();

// 每隔 60s 自动保存
setInterval("autosave()", 1000 * 60);