import Storage from './storage.js';

const ITEM_STORAGE = 'books';
/**
 * Class to Add, Remove and Get books from Storage from
 */
export default class BookStore {
  #booksCollection = [];

  #bookStorage;

  constructor() { this.#bookStorage = new Storage(ITEM_STORAGE); }

  addBook= (author, title) => {
    let id = 1;
    this.#booksCollection = this.#bookStorage.getItemStorage();
    if (this.#booksCollection !== null) {
      const IDS = this.#booksCollection.map((object) => parseInt(object.id, 10));
      const MAX_ID = Math.max(...IDS);
      id = MAX_ID + 1;
    }
    const objectBook = { id: id.toString(), author, title };
    this.#bookStorage.setItemStorage(objectBook);
  }

  removeBook=(id) => {
    if (id > 0) {
      this.#booksCollection = this.#bookStorage.getItemStorage();
      const result = this.#booksCollection.filter((b) => parseInt(b.id, 10) !== parseInt(id, 10));
      this.#bookStorage.removeItemStorage(result);
    }
  }

  getBooks=() => this.#bookStorage.getItemStorage();

  storageAvailable=() => this.#bookStorage.storageAvailable();
}
