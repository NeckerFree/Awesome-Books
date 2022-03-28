/**
 * Class to access Local Storage
 */
const STORAGE_TYPE = 'localStorage';
export default class Storage {
    #jsonItems;

    #itemName;

    #itemsCollection = [];

    constructor(itemName) {
      this.#itemName = itemName;
    }

    getItemStorage=() => {
      this.#jsonItems = localStorage.getItem(this.#itemName);
      return (this.#jsonItems === null) ? null : JSON.parse(this.#jsonItems);
    }

    setItemStorage=(objectItem) => {
      if (this.#itemsCollection === null) {
        this.#itemsCollection = [];
      }
      this.#itemsCollection.push(objectItem);
      this.#jsonItems = JSON.stringify(this.#itemsCollection);
      localStorage.setItem(this.#itemName, this.#jsonItems);
    }

    removeItemStorage=(jsonItemsResult) => {
      if (jsonItemsResult.length === 0) {
        localStorage.removeItem(this.#itemName);
      } else {
        this.#jsonItems = JSON.stringify(jsonItemsResult);
        localStorage.setItem(this.#itemName, this.#jsonItems);
      }
    }

    storageAvailable=() => {
      let storage;
      try {
        storage = window[STORAGE_TYPE];
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
}
