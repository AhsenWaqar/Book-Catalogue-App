const books = [];
let markedBooks = [];


function saveBooks() {
    console.log('Saving books:', books); 
    fetch('books.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(books)
    }).then(response => response.json()).then(data => {
        if (data.status === 'success') {
            console.log('Books saved successfully!');
        }
    });
}


function loadBooks() {
    console.log('Loading books...'); 
    fetch('books.php')
        .then(response => response.json())
        .then(data => {
            console.log('Books loaded:', data); 
            books.push(...data);
            displayBooks(books);
        })
        .catch(error => console.error('Error loading books:', error));
}


window.onload = loadBooks;

document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const criteria = document.getElementById('criteria').value;
    const filteredBooks = books.filter(book => book[criteria].toString().toLowerCase().includes(searchInput));
    console.log('Filtered books:', filteredBooks); 
    displayBooks(filteredBooks);
});

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Year: ${book.year}</p>
            <button onclick="toggleMark('${book.title}')">${markedBooks.includes(book.title) ? 'Unmark' : 'Mark for Reading'}</button>
            <button onclick="deleteBook('${book.title}')">Delete</button>
        `;
        bookList.appendChild(bookItem);
    });
}

function toggleMark(title) {
    if (markedBooks.includes(title)) {
        markedBooks = markedBooks.filter(book => book !== title);
    } else {
        markedBooks.push(title);
    }
    displayBooks(books);
    saveBooks(); 
}

function addBook() {
    const title = document.getElementById('newBookTitle').value;
    const author = document.getElementById('newBookAuthor').value;
    const year = document.getElementById('newBookYear').value;

    if (title && author && year) {
        books.push({ title, author, year: parseInt(year) });
        displayBooks(books);
        saveBooks();
        
        document.getElementById('newBookTitle').value = '';
        document.getElementById('newBookAuthor').value = '';
        document.getElementById('newBookYear').value = '';
    } else {
        alert('Please fill all fields');
    }
}

function deleteBook(title) {
    const index = books.findIndex(book => book.title === title);
    if (index !== -1) {
        books.splice(index, 1); 
        displayBooks(books);
        saveBooks(); 
    }
}
