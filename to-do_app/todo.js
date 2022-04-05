let todos = readTodos();

let filters = {
    searchText: '',
    hideCompleted: false
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
        completed: false,
        id: uuidv4()
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    addInput.value = ''
})

