// Read notes from LS

const getSavedNotes = () => {
    let notesJSON = localStorage.getItem('notes')
    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// save notes

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// creating DOM element for note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div')
    const noteElText = document.createElement('span')
    const noteElBtn = document.createElement('button')
    noteElBtn.textContent = 'Delete'
    noteEl.appendChild(noteElText)
    noteEl.appendChild(noteElBtn)


    if (note.title.length > 0) {
        noteElText.textContent = note.title
    } else {
        noteElText.textContent = "Unnamed note"
    }

    return noteEl

}

// rendering notes
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        let noteEl = generateNoteDOM(note);
        

        document.querySelector('#notes').appendChild(noteEl)
    })
}
