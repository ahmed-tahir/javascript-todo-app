// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const deleteButton = document.querySelector('.todos-delete');

// event listeners
window.addEventListener('DOMContentLoaded', () => localStorage.clear());
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
deleteButton.addEventListener('click', deleteTodos);

// functions
function addTodo(event){
    // prevents form from submitting
    event.preventDefault();

    // avoid adding emtpy todo's
    if(todoInput.value === "") 
        return;
    
    // creates a todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creates todo list elements
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // append items to todo div
    todoDiv.appendChild(newTodo);

    // adds a todo to local storage
    saveTodosToLocalStorage(todoInput.value);

    // completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // clears the input value
    todoInput.value = "";
    
}

// action buttons on todo
function deleteCheck(event){
    // gets the source of the event
    const item = event.target;

    // deletes a todo
    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;
        // adding animations while removing
        todo.classList.add('fall');
        deleteTodosFromLocalStorage(todo);
        todo.addEventListener('transitionend',()=>{
            todo.remove();
        });
    }

    // marks a todo as completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

// filtering todo's
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value)
        {
            case 'All':
                todo.style.display = 'flex';
                break;
            case 'Completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'Uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'default':
                todo.style.display = 'flex';
                break;
        }
    });
}

function deleteTodos(event){
    event.preventDefault();
    todoList.innerHTML = '';

    // delete all todo's from local storage
    if(localStorage.getItem('todos') !== null){
        localStorage.removeItem('todos');
    }
}

// saving todo's to local storage
function saveTodosToLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// deleting todo's from local storage
function deleteTodosFromLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const itemToRemove = todo.children[0].innerText;
    todos.splice(todos.indexOf(itemToRemove), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}

