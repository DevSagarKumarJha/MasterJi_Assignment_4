const API_URL = "https://api.freeapi.app/api/v1/public/books";
let books = [];
let currentPage = 1;
let totalPages = 1;
let isGridView = false;


// Fetch Books
async function fetchBooks(page = 1) {
    try {
        const res = await fetch(`${API_URL}?page=${page}`);
        const responseData = await res.json();
        books = responseData.data.data;
        totalPages = responseData.data.totalPages;

        console.log(books)
        updatePagination();
        displayBooks(books);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Display Books
function displayBooks(bookList) {
    const container = document.getElementById("bookContainer");
    container.innerHTML = "";
    container.className = isGridView ? "grid-view" : "list-view";

    console.log(container.className)
    bookList.forEach(book => {
        const { title, authors, publisher, publishedDate, imageLinks, infoLink } = book.volumeInfo;
        const thumbnail = imageLinks?.thumbnail || "./assets/images/placeholder.png";

        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <div>
                <h3>${title}</h3>
                <p><span>Written by:</span> ${authors ? authors.join(", ") : "Unknown"}</p>
                <p><span>Publisher:</span> ${publisher || "Unknown"}</p>
                <p><span>Date:</span> ${publishedDate || "N/A"}</p>
                <a href="${infoLink}" target="_blank">More Info</a>
            </div>
        `;
        container.appendChild(bookDiv);
    });
}

// Update Pagination Buttons
function updatePagination() {
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Search Books
document.getElementById("searchBar").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.volumeInfo.title.toLowerCase().includes(query) ||
        (book.volumeInfo.authors && book.volumeInfo.authors.some(author => author.toLowerCase().includes(query)))
    );
    displayBooks(filteredBooks);
});

// Toggle View
document.getElementById("toggleView").addEventListener("click", () => {
    isGridView = !isGridView;
    document.getElementById("toggleView").textContent = isGridView ? "Switch to List View" : "Switch to Grid View";
    displayBooks(books);
});

// Sort Books
document.getElementById("sortAlpha").addEventListener("click", () => {
    books.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
    displayBooks(books);
});
document.getElementById("sortDate").addEventListener("click", () => {
    books.sort((a, b) => new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate));
    displayBooks(books);
});

// Pagination Controls
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchBooks(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchBooks(currentPage);
    }
});

// Load Books on Page Load
fetchBooks();
