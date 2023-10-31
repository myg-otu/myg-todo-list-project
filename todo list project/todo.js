// tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();


function eventListeners(){ // tüm event listenerlar
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded" ,LoadAllTodosToUI);
secondCardBody.addEventListener("click", deleteTodo);
filter.addEventListener("keyup" ,filterTodos);
clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
if (confirm ("Tümü Silinsin mi ?")){
    // arayüzden todoları temizleme
    // todolist.innerHTML = ""; yavaş yöntem
    while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
    }
     localStorage.removeItem("todos");

} 


}
function filterTodos(e){
   const filterValue = e.target.value.toLowerCase();
   const listItems = document.querySelectorAll(".list-group-item");
 
   listItems.forEach(function(listItem){
    const text = listItem.textContent.toLocaleLowerCase();
    if (text.indexOf(filterValue) === -1){
        // bulamadı
        listItem.setAttribute("style","display : none !important");
    }
    else {
        listItem.setAttribute("style", "display : block");
    }
   });

}
function deleteTodo(e){
console.log(e.target);
if ( e.target.className === "fa fa-remove"){
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
    showAlert("succes","Todo başarı ile silindi !");
}
}
function deleteTodoFromStorage(deletetodo){
let todos = getTodosFromStorage();

todos.forEach(function(todo,index){
 if (todo === deletetodo){
    todos.splice(index,1); // arraydan değeri silebiliriz.
 
}
})
localStorage.setItem("todos",JSON.stringify(todos));

}

function LoadAllTodosToUI(){
let todos = getTodosFromStorage();
todos.forEach(function(todo){
 addTodoUI(todo);

})
}

function addTodo(e){
    const newTodo = todoInput.value.trim();// trim boşlukları silmeye işe yarıyor  
if (newTodo === ""){
   
    showAlert("danger","Lütfen bir Todo Giriniz !");
}
else {
    addTodoUI(newTodo);
    addTodoToStorage(newTodo);

    showAlert("success","başarı ile eklendi");
}
     
    

    e.preventDefault();
}
function getTodosFromStorage(){ // storagedan todoları alma 
    let todos;
if( localStorage.getItem("todos") === null){
    todos = [];
}
else {
    todos = JSON.parse(localStorage.getItem("todos"));
}
return todos;
}
function addTodoTotorage(newTodo){
let todos;
if( localStorage.getItem("todos") === null){
    todos = [];
}
else {
    todos = JSON.parse(localStorage.getItem("todos"));
}

}
function addTodoToStorage(newTodo){
let todos = getTodosFromStorage();
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
const alert =  document.createElement("div");

alert.className = `alert alert-${type}`;
alert.textContent = message;
firstCardBody.appendChild(alert)
// setTimeout Metodu
setTimeout(function(){
   alert.remove();
},1500);


}
function addTodoUI(newTodo){ // string değerini list item olarak UI'ya ekleyece
    


// list item oluşturma
const listItem = document.createElement("li");
// link oluşturma
const link = document.createElement("a");
link.href ="#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>"
listItem.className = "list-group-item d-flex justify-content-between";

// text node ekleme  
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
// todo list'e list ıtem'I ekleme
todoList.appendChild(listItem);
todoInput.value = "";
console.log(listItem);

}