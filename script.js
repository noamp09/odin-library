const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML = ''; // Clear previous display
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
            <strong>Title:</strong> ${book.title}<br>
            <strong>Author:</strong> ${book.author}<br>
            <strong>Pages:</strong> ${book.pages}<br>
            <strong>Read:</strong> ${book.read ? 'Yes' : 'No'}<br>
            <button class="remove-btn" data-index="${index}">Remove</button>
            <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
        `;
        libraryContainer.appendChild(bookDiv);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayLibrary();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('new-book-form').style.display = 'block';
});

document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    document.getElementById('book-form').reset(); // Reset form fields
    document.getElementById('new-book-form').style.display = 'none'; // Hide form
});

document.getElementById('library').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.getAttribute('data-index');
        removeBook(index);
    } else if (event.target.classList.contains('toggle-read-btn')) {
        const index = event.target.getAttribute('data-index');
        toggleReadStatus(index);
    }
});

// Example: Manually adding some books
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);
addBookToLibrary('1984', 'George Orwell', 328, true);

displayLibrary();
