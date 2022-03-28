import BookStore from './modules/bookStore.js';
import { DateTime } from './modules/luxon.js';
/**
 * Declarations
 */
const inputTitle = document.getElementById('inputTitle');
const inputAuthor = document.getElementById('inputAuthor');
const divBooks = document.querySelector('.books');
const form1 = document.getElementsByTagName('form')[0];
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');
const section1 = document.getElementById('sectionGrid');
const section2 = document.getElementById('sectionInput');
const section3 = document.getElementById('contact');
const datePlace = document.querySelector('.date');

const BOOK_TEMPLATE = `<div class="bookRow"><label id="bookEntry">"{book.title}" by {book.author}</label>
                       <button type="button" class="remove" id="{book.id}">Remove</button></div>`;
const EMPTY_LIST = '<div class="bookRow"><label id="bookEntry">Your books list is empty, you can select "Add new" menu to add some books.</label></div>';

/**
   * Object instantiation
   */
const bookStore = new BookStore();
const luxonDateTime = DateTime.local();
/**
  * Functions
  */
const removeFromStore = (ev) => {
  const bookid = parseInt(ev.target.id, 10);
  bookStore.removeBook(bookid);
  window.location.reload();
};

const setBooksForm = () => {
  let booksCollection = [];
  booksCollection = bookStore.getBooks();
  let allBooks = '';
  if (booksCollection !== null) {
    for (let index = 0; index < booksCollection.length; index += 1) {
      const isRowPair = index % 2;
      const book = booksCollection[index];
      allBooks += BOOK_TEMPLATE
        .replace('{book.title}', book.title)
        .replace('{book.author}', book.author)
        .replace('{book.id}', parseInt(book.id, 10))
        .replace('bookRow', (isRowPair === 0) ? 'bookRow alternateRow' : 'bookRow');
    }
    divBooks.innerHTML = allBooks;
    const buttonsRemove = document.querySelectorAll('.remove');
    [].forEach.call(buttonsRemove, (buttonRemove) => {
      buttonRemove.onclick = removeFromStore;
    });
  } else {
    divBooks.innerHTML = EMPTY_LIST;
  }
};

/**
   * Events
   */

link1.addEventListener('click', () => {
  section2.classList.add('deactivate');
  section3.classList.add('deactivate');
  section1.classList.remove('deactivate');
  link1.classList.add('visited');
  link2.classList.remove('visited');
  link3.classList.remove('visited');
  setBooksForm();
});
link2.addEventListener('click', () => {
  section1.classList.add('deactivate');
  section3.classList.add('deactivate');
  section2.classList.remove('deactivate');
  link1.classList.remove('visited');
  link2.classList.add('visited');
  link3.classList.remove('visited');
});
link3.addEventListener('click', () => {
  section1.classList.add('deactivate');
  section2.classList.add('deactivate');
  section3.classList.remove('deactivate');
  link1.classList.remove('visited');
  link2.classList.remove('visited');
  link3.classList.add('visited');
});

form1.addEventListener('submit', () => {
  if (bookStore.storageAvailable()) {
    bookStore.addBook(inputAuthor.value, inputTitle.value);
    inputAuthor.value = '';
    inputTitle.value = '';
  }
});
window.addEventListener('load', () => {
  const CURRENT_DATE_TIME = luxonDateTime.toISO();
  datePlace.innerHTML = CURRENT_DATE_TIME;
  section2.classList.add('deactivate');
  section3.classList.add('deactivate');
  link1.classList.add('visited');
  link2.classList.remove('visited');
  link3.classList.remove('visited');
  if (bookStore.storageAvailable()) {
    setBooksForm();
  }
});
