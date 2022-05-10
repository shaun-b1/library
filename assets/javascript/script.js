window.onload = function() {
    addToShelf()
    createDeleteButtons()
}

const bookshelf = document.querySelector("#bookshelf")
const newBookButton = document.querySelector("#new-book-button")
const bookEntryModal = document.querySelector("#modal")
const bookEntryForm = document.querySelector("#book-entry-form")
const closeEntryForm = document.querySelector("#close-entry-form")
const createBookButton = document.querySelector("#create-book-button")


const myLibrary = [{
    title: "The Eye of the World",
    author: "Robert Jordan",
    pages: "782",
    read: true
}, {
    title: "The Great Hunt",
    author: "Robert Jordan",
    pages: "706",
    read: true
}, {
    title: "Dune",
    author: "Frank Herbert",
    pages: "412",
    read: false
}];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read ? true : false
};

newBookButton.addEventListener('click', () => {
    bookEntryModal.style.display = "block"
});

closeEntryForm.addEventListener('click', () => {
    bookEntryModal.style.display = "none"
});

function addToLibrary() {
    const newBook = new Book(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("pages").value,
        document.getElementById("true").checked
    )
    myLibrary.push(newBook)
};

function addToShelf() {
    clearMyLibrary()
    for (const book of myLibrary) {
        const item = document.createElement("li")
        item.classList.add('book')

        const title = document.createElement("h2")
        title.textContent = `${book.title}`

        const author = document.createElement("h2")
        author.textContent = `${book.author}`

        const pages = document.createElement("p")
        pages.textContent = `${book.pages} pages`

        const read = document.createElement("p")
        read.classList.add('read')
        read.textContent = book.read ? "I've read this" : "I haven't read this yet"

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.setAttribute("data-index", `${myLibrary.indexOf(book)}`)
        deleteButton.textContent = "Delete me!"

        read.addEventListener('click', () => {
            if (read.textContent === "I've read this") {
                read.textContent = "I haven't read this yet"
                book.read = false
            } else {
                read.textContent = "I've read this"
                book.read = true
            }
        })

        item.append(title, author, pages, read, deleteButton)
        bookshelf.appendChild(item)
    }
}

function prevent() {
    bookEntryForm.addEventListener("submit", (e) => {
        e.preventDefault();
    })
}

function clearMyLibrary() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild)
    }
}

createBookButton.addEventListener("click", () => {
    prevent()
    addToLibrary()
    addToShelf()
    createDeleteButtons()
    bookEntryModal.style.display = "none"
    bookEntryForm.reset()
})

function createDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-button")
    deleteButtons.forEach((element) => {
        element.addEventListener('click', () => {
            myLibrary.splice(element.dataset.index, 1)
            addToShelf()
            createDeleteButtons()
        })
    })
}