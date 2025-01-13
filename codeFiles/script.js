const books = [
    { title: "SQL", author: "Zeeshan Usmani", year: 2016 },
    { title: "Power BI", author: "Zeeshan Usmani", year: 2019 },
    { title: "Artificial Intelligence", author: "Farah Hameed", year: 2019 },
    { title: "Machine Learning", author: "Farah Hameed", year: 2020 },
    { title: "Data Visulization", author: "Zeeshan Usmani", year: 2020 },
    { title: "Python Programming", author: "Zeeshan Usmani", year: 2018 },
];

let markedBooks = [];

document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const criteria = document.getElementById('criteria').value;
    const filteredBooks = books.filter(book => book[criteria].toString().toLowerCase().includes(searchInput));
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
}