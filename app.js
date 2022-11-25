class App {
    constructor() {
        this.notes = []
        this.title = ''
        this.body = ''
        this.id = ''

        this.$form = document.querySelector('.form')
        this.$title = document.querySelector('#title') 
        this.$body = document.querySelector('#body')
        this.$formSubmit = document.querySelector('.form__submit')
        this.$formClose = document.querySelector('.form__close')
        this.$deleteBtn = document.querySelector('#delete') 
        this.$paletteBtn = document.querySelector('#palette')
        this.$notes = document.querySelector('.notes')
        this.$placeholder = document.querySelector('.placeholder')
        this.$colors = document.querySelector('.colors')
        this.$modal = document.querySelector('.modal')
        this.$modalTitle = document.querySelector('.modal__title')
        this.$modalBody = document.querySelector('.modal__body')

        this.handleEvents()
    }
    
    handleEvents() {
        document.addEventListener('click', e => {
            this.handleForm(e)
            this.handleCloseFormBtn(e)
            this.deleteNote(e)
            const color = e.target.dataset.color
            color && this.editNoteColor(color)
            this.selectNote(e)
            this.openModal(e)
            this.closeModal(e)
        })

        document.addEventListener('submit', e => {
            e.preventDefault()
            const title = this.$title.value
            const body = this.$body.value
            const hasNote = title || body
            hasNote && this.addNote({ title: this.$title.value, body: this.$body.value })
        })

        document.addEventListener('mouseover', e => {
            this.openTooltip(e)
        }) 

        document.addEventListener('mouseout', e => {
            this.closeTooltip(e)
        })

        this.$colors.addEventListener('mouseover', function() {
            this.style.display = 'flex'
        })

        this.$colors.addEventListener('mouseout', function() {
            this.style.display = 'none'
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

    openTooltip(e) {
        if (!e.target.matches('#palette')) return
        const noteCoords = e.target.getBoundingClientRect()
        const horizontal = noteCoords.left
        const vertical = noteCoords.top + 15
        this.$colors.style.transform = `translate(${horizontal}px, ${vertical}px)`
        this.$colors.style.display = 'flex'
        this.id = e.target.dataset.id
    }

    closeTooltip(e) {
        if (!e.target.matches('#palette')) return
        this.$colors.style.display = 'none'
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

    editNoteColor(color) {
        this.notes = this.notes.map(note => {
            return note.id === Number(this.id) ? { ...note, color } : note
        })
        this.displayNotes()
    }

    openModal(e) {
        if(e.target.matches('#palette')) return
        if (!this.$notes.contains(e.target)) return
        this.$modal.style.display = 'flex'
        this.$modalTitle.value = this.title
        this.$modalBody.value = this.body
    }

    closeModal(e) {
        if (!e.target.matches('.modal__btn')) return
        this.editNote()
        this.$modal.style.display = 'none'
    }

    selectNote(e) {
        const $selectedNote = e.target.closest('.note')
        if (!$selectedNote) return
        const [$noteTitle, $noteBody] = $selectedNote.children
        this.title = $noteTitle.innerText
        this.body = $noteBody.innerText
        this.id = $selectedNote.dataset.id
    }

    editNote() {
        const title = this.$modalTitle.value
        const body = this.$modalBody.value
        this.notes = this.notes.map(note => {
            return note.id === Number(this.id) ? {...note, title, body} : note
        })
        this.displayNotes()
    }

    displayNotes() {
        this.$placeholder.style.display = this.notes.length > 0 ? 'none' : 'flex'

        this.$notes.innerHTML = this.notes.map(note => {
            const { title, body, color, id } = note
            return `<div class="note" style="background-color: ${color}" data-id="${id}">
                        <span class="note__title ${!title && "hide-title"}">${title}</span>
                        <span class="note__body">${body}</span>
                        <div class="note__icons">
                            <i class="fa-solid fa-trash" id="delete" data-id="${id}"></i>
                            <i class="fa-solid fa-palette" id="palette" data-id="${id}"></i>
                        </div>
                    </div>`
        }).join('')
    }
}

new App()