function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let toDoInput = document.querySelector(".input");
let addButton = document.querySelector(".button");
let todo;
// let todoList = [];
let showTodo = document.querySelector(".todos-container")

let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];


addButton.addEventListener("click", (e) =>{
    e.preventDefault();
    todo = toDoInput.value;
    let flag = 0;
    if(todo.length>0 && todoList.length>0)
    {
        for(let i = 0;i<todoList.length;i++)
        {
            if(todoList[i].todo===todo){
                flag = 1;
                break;
            }
        }
    }
    if(flag===0){
        todoList.push({id: uuid(), todo, isCompleted:false});
    }
    console.log(todoList);
    todoListDisplay(todoList);
    localStorage.setItem("todos", JSON.stringify(todoList));
    toDoInput.value = "";
}
)

showTodo.addEventListener("click",(e)=>{
    let key = e.target.dataset.key;
    let delToDo = e.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo)
    todoList = todoList.filter(todo => todo.id !== delToDo)
    localStorage.setItem("todos", JSON.stringify(todoList));
    todoListDisplay(todoList);
})

function todoListDisplay(todoList){
    showTodo.innerHTML= todoList.map(({id,todo,isCompleted}) =>`<div><input id="item-${id}" data-key=${id} type="checkbox" ${isCompleted ? "checked": ""}> 
    <label class ="todo todo-text t-pointer ${isCompleted ? "checked-todo": ""}" for="item-${id}" data-key=${id}>${todo}</label><button class="absolute right-0 button cursor" data-todokey=${id}><span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span></button></div>`)
}

todoListDisplay(todoList);
