class BookStore {
    #books;
 
    #itemName;
 
    #booksCollection = [];
 
    constructor(itemName) {
      this.#itemName = itemName;
    }
 
    addBook(author, title) {
      let id = 1;
      this.#booksCollection = this.getBookStorage();
      if (this.#booksCollection !== null) {
        const ids = this.#booksCollection.map((object) => parseInt(object.id, 10));
        const maxId = Math.max(...ids);
        id = maxId + 1;
      }
      const objectBook = { id: id.toString(), author, title };
      this.setBookStorage(objectBook);
    }
 
    removeBook(id) {
      if (id > 0) {
        this.#booksCollection = this.getBookStorage();
        const result = this.#booksCollection.filter((b) => parseInt(b.id, 10) !== parseInt(id, 10));
        this.removeBookStorage(result);
      }
    }
 
    getBookStorage() {
      this.#books = localStorage.getItem(this.#itemName);
      return (this.#books === null) ? null : JSON.parse(this.#books);
    }
 
    setBookStorage(objectBook) {
      if (this.#booksCollection === null) {
        this.#booksCollection = [];
      }
      this.#booksCollection.push(objectBook);
      this.#books = JSON.stringify(this.#booksCollection);
      localStorage.setItem(this.#itemName, this.#books);
    }
 
    removeBookStorage(booksResult) {
      if (booksResult.length === 0) {
        localStorage.removeItem(this.#itemName);
      } else {
        this.#books = JSON.stringify(booksResult);
        localStorage.setItem(this.#itemName, this.#books);
      }
    }
 }
export {BookStore};
