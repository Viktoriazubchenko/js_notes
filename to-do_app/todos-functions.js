// state
const todoList = document.querySelector('.todo-list');
const todoSummary = document.querySelector('.todo-subtitle');




// read todos from the ls

const readTodos = () => {
    let todosJSON = localStorage.getItem('todos');
    
   if(todosJSON !== null) {
       return JSON.parse(todosJSON)
   } else {
       return []
   }
}

// save todos to ls

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
} 

// removing item

const removeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)
    if(todoIndex > -1){
        todos.splice(todoIndex, 1);
        console.log(todoIndex)
    }
}

// mark as done and undone

const markAsDone = (id) => {
    const todo = todos.find(todo => todo.id === id );
    if(todo !== undefined ){
        todo.completed = !todo.completed;
    }
    return todo;
}

// creating todo item

const creatingTodoItem = (todo) => {
    let todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        
        todoText = document.createElement('span')
        todoText.textContent = todo.text;

        const todoCheck = document.createElement('input')
        todoCheck.type = "checkbox"
        todoCheck.checked = todo.completed;

        todoCheck.addEventListener('change', (e) => {
            markAsDone(todo.id);
            saveTodos(todos);
            renderTodos(todos, filters);
            console.log( 'change');
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'

        deleteBtn.addEventListener('click', () =>{
            removeTodo(todo.id);
            saveTodos(todos);
            renderTodos(todos, filters);
        })
        
        todoItem.appendChild(todoText)
        todoItem.appendChild(todoCheck)
        todoItem.appendChild(deleteBtn)
    return todoItem
}

// filter todos by search

const filteringBySearch = (todos, filters) => {
    let searchedTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    return searchedTodos;
}

// filter todos by complete

const hideCompleted = (todos, filters) => {
    let filteredTodos = todos.filter(function(todo){
        if(filters.hideCompleted){
            return !todo.completed
        } else {
            return true
        }
    })
    return filteredTodos
}

// rendering todos
const renderTodos = (todos, filters) => {
    
    let searchedTodos = filteringBySearch(todos, filters)
    

    let filteredTodos = hideCompleted(searchedTodos, filters)


    let incompletedTodos = filteredTodos.filter(function(todo){return !todo.completed});

    todoList.innerHTML = "";

    todoSummary.textContent = `You have ${incompletedTodos.length} incompleted tasks`

    filteredTodos.forEach((todo) => {
        const todoItem = creatingTodoItem(todo)
        todoList.appendChild(todoItem);
    });
}

