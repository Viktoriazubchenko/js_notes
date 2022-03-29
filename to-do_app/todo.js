// const todos = [{
//     text: 'Order cat food',
//     completed: false
// }, {
//     text: 'Clean kitchen',
//     completed: true
// }, {
//     text: 'Buy food',
//     completed: true
// }, {
//     text: 'Do work',
//     completed: false
// }, {
//     text: 'Exercise',
//     completed: true
// }]

let todos = [];

let filters = {
    searchText: '',
    hideCompleted: false
}

let todosJSON = localStorage.getItem('todos');

if (todosJSON !== null) {
    todos = JSON.parse(todosJSON)
} else {
    console.log ('Local Storage is empty')
}

const todoList = document.querySelector('.todo-list');
const todoSummary = document.querySelector('.todo-subtitle');

const renderTodos = (todos, filters) => {
    
    // let filteredTodos = todos.filter(function(todo){
    //     const searchMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
    //     const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    //     return searchMatch && hideCompletedMatch
    // });

    let filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    })

    filteredTodos = filteredTodos.filter(function(todo){
        if(filters.hideCompleted){
            return !todo.completed
        } else {
            return true
        }
    })


    let incompletedTodos = filteredTodos.filter(function(todo){return !todo.completed});

    todoList.innerHTML = "";

    todoSummary.textContent = `You have ${incompletedTodos.length} incompleted tasks`

    filteredTodos.forEach((todo) => {
        let todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.textContent = todo.text;
        todoList.appendChild(todoItem);
    });
}

renderTodos(todos, filters);

const checkbox = document.querySelector('.hide-completed');
const searchInput = document.querySelector('.search-text');

checkbox.addEventListener('change', (event) => {
    filters.hideCompleted = event.target.checked // true or false
    renderTodos(todos, filters)
})

searchInput.addEventListener('input', (event) => {
    filters.searchText = event.target.value
    renderTodos(todos, filters)
})

const addInput = document.querySelector('.add-input');
const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', function(event) {
    event.preventDefault()
    todos.push({
        text: addInput.value,
        completed: false
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos(todos, filters)
    addInput.value = ''
})

