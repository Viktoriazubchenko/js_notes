// const notes = [{
//     title: 'my next trip',
//     body: 'I would like to go to Spain'
// }, {
//     title: 'Habbits to work on',
//     body: 'Exercise. Eating a bit better.'
// }, {
//     title: 'Office modification',
//     body: 'Get a new seat'
// }]

let notes = [];

const filters = {
    searchText: ''
}

// checking saved notes
let notesJson = localStorage.getItem('notes');

if (notesJson !== null) {
    notes = JSON.parse(notesJson)
} 


const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''
    
    filteredNotes.forEach(function (note) {
        const noteEl = document.createElement('p')

        if(note.title.length > 0){
            noteEl.textContent = note.title
        } else {
            noteEl.textContent = "Unnamed note"
        }
       
        document.querySelector('#notes').appendChild(noteEl)
    })
}

renderNotes(notes, filters)

// create
document.querySelector('#create-note').addEventListener('click', function (e) {
    notes.push({
        title: '',
        body: ''
    })
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(notes, filters)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
    
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    console.log(e.target.value)
})