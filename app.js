class App {
    constructor() {
        this.notes = []
        this.title = ''
        this.body = ''

        this.$form = document.querySelector('.form')
        this.$title = document.querySelector('#title') 
        this.$body = document.querySelector('#body')
        this.$formSubmit = document.querySelector('.form__submit')
        this.$formClose = document.querySelector('.form__close')
        this.$deleteBtn = document.querySelector('#delete') 
        this.$paletteBtn = document.querySelector('#palette')
        this.$notes = document.querySelector('.notes')
        this.$message = document.querySelector('.message')
        this.handleEvents()
    }
    
    handleEvents() {
        document.addEventListener('click', e => {
            this.handleForm(e)
            this.handleCloseFormBtn(e)
            this.deleteNote(e)
        })

        document.addEventListener('submit', e => {
            e.preventDefault()
            const title = this.$title.value
            const body = this.$body.value
            const hasNote = title || body
            hasNote && this.addNote({ title: this.$title.value, body: this.$body.value })
        })
    }

    handleForm(e) {
        const isFormClicked = this.$form.contains(e.target)
        const title = this.$title.value
        const body = this.$body.value
        const hasNote = title || body

        if (isFormClicked) {
            this.openForm()
        } else if (hasNote) {
            this.addNote({title, body })
        } else {
            this.closeForm()
        }
    }

    handleCloseFormBtn(e) {
        if (e.target.matches('.form__close')) {
            this.closeForm()
        } 
    }

    openForm() {
        this.$body.style.display = 'block'
        this.$formSubmit.style.display = 'inline-block'
        this.$formClose.style.display = 'inline-block'
    }

    closeForm() {
        this.$body.style.display = 'none'
        this.$formSubmit.style.display = 'none'
        this.$formClose.style.display = 'none'
        this.$title.value = ''
        this.$body.value = ''
    }

    addNote({ title, body }) {
        const newNote = {
            title,
            body,
            color: 'white',
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        }
        this.notes = [...this.notes, newNote]
        this.closeForm()
        this.displayNotes()
    }

    deleteNote(e) {
        if (!e.target.matches('#delete')) return 
        this.notes = this.notes.filter(note => Number(e.target.dataset.id) !== note.id)
        this.displayNotes()
    }

    displayNotes() {
        this.$message.style.display = this.notes.length > 0 ? 'none' : 'block'

        this.$notes.innerHTML = this.notes.map(note => {
            const { title, body, color, id } = note
            return `<div class="note">
                        <span class="note__title">${title}</span>
                        <span class="note__body">${body}</span>
                        <div class="note__icons">
                            <i class="fa-solid fa-trash" id="delete" data-id="${id}"></i>
                            <i class="fa-solid fa-palette" id="palette"></i>
                        </div>
                    </div>`
        }).join('')
    }
}

new App()