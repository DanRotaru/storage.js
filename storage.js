/**
 * storage.js — lightweight localstorage API library
 * Copyright: by DanRotaru <https://t.me/danrotaru>
 * Github: <https://github.com/DanRotaru/storage.js>
 * License: Free to use
 */

const storage = {
  name: 'storage.js',
  data: {},

  init(name) {
    name ? this.name = name : null;
    const storedData = localStorage.getItem(this.name);
    this.data = storedData ? JSON.parse(storedData) : {};
  },

  get(key) {
    return key.split('.').reduce((result, k) => result && result[k], this.data);
  },

  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const obj = keys.reduce((acc, k) => acc[k] ?? (acc[k] = {}), this.data);
    obj[lastKey] = value;

    localStorage.setItem(this.name, JSON.stringify(this.data));
  },

  update(key, value) {
    this.set(key, value);
  },

  remove(key) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const obj = keys.reduce((acc, k) => acc && acc[k], this.data);
    if (obj && obj.hasOwnProperty(lastKey)) {
      delete obj[lastKey];
    }

    localStorage.setItem(this.name, JSON.stringify(this.data));
  },

  clear() {
    this.data = {};

    localStorage.removeItem(this.name);
  }
};

export default storage;

