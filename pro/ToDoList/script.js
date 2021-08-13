var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

function addToDoItem() {
   console.log(arguments.callee.name+" button clicked")
   var itemText = toDoEntryBox.value;
   newToDoItem(itemText, false);
}


var clearcompletedbutton = document.getElementById("clear-completed-button");
clearcompletedbutton.addEventListener("click", clearCompletedToDoItems);

function clearCompletedToDoItems() {
   console.log(arguments.callee.name+" button clicked")
   var completedItems = toDoList.getElementsByClassName("completed");
   while (completedItems.length > 0) {
     completedItems.item(0).remove();
   }
}


var emptybutton = document.getElementById("empty-button");
emptybutton.addEventListener("click", emptyList);

function emptyList() {
   console.log(arguments.callee.name+" button clicked")
   var toDoItems = toDoList.children;
   while (toDoItems.length > 0) {
     toDoItems.item(0).remove();
   }
}


var savebutton = document.getElementById("save-button");
savebutton.addEventListener("click", saveList);

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

function toggleToDoItemState() {
  this.classList.contains("completed") ? this.classList.remove("completed") : this.classList.add("completed");
}
 
 
 function saveList() {
  console.log(arguments.callee.name+" button clicked")
   var toDos = [];
   for (var i = 0; i <  toDoList.children.length; i++) {
     var toDo = toDoList.children.item(i);
     var toDoInfo = {
       "task": toDo.innerText,
       "completed": toDo.classList.contains("completed")
     };
      toDos.push(toDoInfo);
   }
   localStorage.setItem("toDos", JSON.stringify(toDos));
 }
 
 function loadList() {
    console.log(arguments.callee.name+" button clicked")
   if (localStorage.getItem("toDos") != null) {
     var toDos = JSON.parse(localStorage.getItem("toDos"));
     for (var i = 0; i < toDos.length; i++) {
        var toDo = toDos[i];
        newToDoItem(toDo.task, toDo.completed);
     }
   }
 }
 
 loadList();