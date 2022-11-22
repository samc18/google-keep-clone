class App {
    constructor() {
        this.$form = document.querySelector('.form')
        this.$title = document.querySelector('#title') 
        this.$body = document.querySelector('#body')
        this.$formSubmit = document.querySelector('.form__submit')
        this.$formClose = document.querySelector('.form__close')
        this.$deleteBtn = document.querySelector('#delete') 
        this.$paletteBtn = document.querySelector('#palette')
        this.handleEvents()
    }
    
    handleEvents() {
        document.addEventListener('click', e => {
            this.handleForm(e)
            this.handleCloseFormBtn(e)
        })

        document.addEventListener('submit', e => {
            e.preventDefault()
        })
    }

    handleForm(e) {
        const isFormClicked = this.$form.contains(e.target)

        if (isFormClicked) {
            this.openForm()
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
    }

    displayNotes() {
        const noteHtml = `
            <div class="note">
                <span class="note__title">Title</span>
                <span class="note__body">this is a note ..napusdhf</span>
                <div class="note__icons">
                    <i class="fa-solid fa-trash" id="delete"></i>
                    <i class="fa-solid fa-palette" id="palette"></i>
                </div>
            </div>`
    }
}

new App()