/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addButton = document.querySelector('.buttonClass');
let current = 1;

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UseBook {
  static pages(pages) {
    const paginationUl = document.querySelector('.css-pagination');
    paginationUl.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
      const paginationLi = document.createElement('li');
      paginationLi.className =
        'p-item rounded-circle text-center d-flex justify-content-center';
      paginationLi.id = i;
      if (current === paginationLi.id) {
        paginationLi.classList.add('bg-dark');
        paginationLi.classList.add('p-active');
        console.log('hello');
      } else {
        paginationLi.classList.remove('active');
      }
      paginationLi.addEventListener('click', () => {
        current = paginationLi.id;
        UseBook.displayBooks(current);
      });
      paginationLi.innerHTML = `<a class='p-link' href='#'>${i}
    </a>`;
      paginationUl.appendChild(paginationLi);
    }
  }

  static paginate(currentPage = 1, rows, array) {
    currentPage -= 1;
    const loopStart = rows * currentPage;
    const paginatedItems = array.slice(loopStart, loopStart + rows);
    console.log(paginatedItems);
    return paginatedItems;
  }

  static createBook() {
    return new Book(bookTitle.value, bookAuthor.value);
  }

  static saveBook(newBook) {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books === null) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books)); //
    }
  }

  static findBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  static displayBooks(currentPage) {
    const bookFound = UseBook.findBooks() || [];
    const reloadBooks = UseBook.paginate(currentPage, 6, bookFound);
    list.innerHTML = '';
    reloadBooks.forEach((abook) => {
      const book = document.createElement('tr');
      const btnContainer = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
      book.appendChild(btnContainer);
      deleteBtn.id = abook.title;
      deleteBtn.className = 'btn btn-dark';
      btnContainer.className = 'd-flex justify-content-end';
      list.appendChild(book);
      btnContainer.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = bookFound.findIndex(
            (rBook) => rBook.title === deleteBtn.id
          );
          bookFound.splice(index, 1);
          // list.removeChild(book);
          const pageId = document.querySelectorAll('.page-item');
          localStorage.setItem('books', JSON.stringify(bookFound));
          UseBook.displayBooks(current);
        }
      });
    });
    const paginationSize = Math.ceil(bookFound.length / 6);
    UseBook.pages(paginationSize);
  }
}
// const paginationData = UseBook.findBooks();
// const paginationSize = Math.ceil(paginationData.length / 6);
// console.log(paginationSize);

// function putPages(pages) {

// putPages(paginationSize);
// // let currentpage = 1;
// let rows = 5;

// const paginationData = UseBook.findBooks();

addButton.addEventListener('click', () => {
  const newBook = UseBook.createBook();
  UseBook.saveBook(newBook);
  UseBook.displayBooks();
  const books = UseBook.findBooks();
  if (books.length === 0) {
    const abook = UseBook.createBook();
    const book = document.createElement('tr');
    const btnContainer = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Remove';
    book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
    book.appendChild(btnContainer);
    deleteBtn.id = abook.title;
    deleteBtn.className = 'btn btn-dark';
    btnContainer.className = 'd-flex justify-content-end';
    list.appendChild(book);
    btnContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      if (deleteBtn.id === abook.title) {
        const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
        books.splice(index, 1);
        list.removeChild(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    UseBook.saveBook(abook);
  }
  // pagination(2, 4, paginationData);
});

window.onload = () => {
  UseBook.displayBooks();
};