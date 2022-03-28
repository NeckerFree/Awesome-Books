
/**
 * Imports
 */
import {BookStore} from './modules/bookStore.js';

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
//  const buttonsRemove=document.querySelectorAll('.remove');
 
 const bookTemplate = `<div class="bookRow"><label id="bookEntry">"{book.title}" by {book.author}</label>
      <button type="button" class="remove" id="{book.id}">Remove</button>
      </div>`;
 /**
   * Class Definition
   */
 
 /**
   * Object instantiation
   */
 const bookStore = new BookStore('books');
 
 /**
  * Functions
  */
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0);
  }
}
 
  function removeFromStore(ev) {
    let bookid=parseInt(ev.target.id,10);
console.log(bookid);
    //if (bookId > 0) {
      bookStore.removeBook(bookid);
      window.location.reload();
    //}
  }
 
function setBooksForm() {
  bookStore.removeBook(-1);
  let booksCollection = [];
  booksCollection = bookStore.getBookStorage();
  let allBooks = '';
  if (booksCollection !== null) {
    for (let index = 0; index < booksCollection.length; index += 1) {
      const isRowPair = index % 2;
      const book = booksCollection[index];
      allBooks += bookTemplate
        .replace('{book.title}', book.title)
        .replace('{book.author}', book.author)
        .replace('{book.id}', parseInt(book.id, 10))
        .replace('bookRow', (isRowPair === 0) ? 'bookRow alternateRow' : 'bookRow');
    }
    divBooks.innerHTML = allBooks;
    const buttonsRemove=document.querySelectorAll('.remove');
      for (const buttonRemove of buttonsRemove) {
        buttonRemove.onclick = removeFromStore;
      }
  }
  //if (document.body.classList.contains('.remove')){
  //  for (const buttonRemove of buttonsRemove) {
  //   buttonRemove.addEventListener('click', ()=> removeFromStore(this.id));
  // }
   
 }
 
 
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
   if (storageAvailable('localStorage')) {
     bookStore.addBook(inputAuthor.value, inputTitle.value);
     inputAuthor.value = '';
     inputTitle.value = '';
   }
 });
 window.addEventListener('load', () => {
   datePlace.innerHTML = Date();
   section2.classList.add('deactivate');
   section3.classList.add('deactivate');
   link1.classList.add('visited');
   link2.classList.remove('visited');
   link3.classList.remove('visited');
   if (storageAvailable('localStorage')) {
     setBooksForm();
   }
 });
 