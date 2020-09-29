/**
 * storage.js — lightweight localstorage API library
 * Copyright: by DanRotaru <https://t.me/danrotaru>
 * License: Free to use
 */

const storage = {
    name: 'storage.js',
    raw: null,
    init: function (name) {
        this.name = name;
        this.raw = localStorage.getItem(this.name);
    },
    json: function () {
        let json = typeof this.raw == 'object' ? JSON.parse(JSON.stringify(this.raw)) : JSON.parse(this.raw);
        return json;
    },
    update: function (val, key) {
        let t = this.json() || {};

        let obj = t;
        let keys = key.split('.');
        let lastKeyIndex = keys.length - 1;

        for (let i = 0; i < lastKeyIndex; ++i) {
            key = keys[i];
            !(key in obj) && (obj[key] = {});
            obj = obj[key];
        }
        obj[keys[lastKeyIndex]] = val;

        localStorage.setItem(this.name, JSON.stringify(t));
        this.raw = JSON.stringify(t);
    },
    add: function(val, key) {
        this.update(val, key);
    },
    remove: function (key) {
        if (this.raw === null) return false;

        let t = this.json();
        let obj = t;
        let keys = key.split('.');
        let lastKeyIndex = keys.length - 1;

        for (let i = 0; i < lastKeyIndex; ++i) {
            key = keys[i];
            !(key in obj) && (obj[key] = {});
            obj = obj[key];
        }
        delete obj[keys[lastKeyIndex]];

        localStorage.setItem(this.name, JSON.stringify(t));
        this.raw = JSON.stringify(t);
    },
    get: function (key) {
        if (this.raw === null) return false;

        let t = this.json();
        let keys = key.split('.');
        let lastKeyIndex = keys.length - 1;

        for (let i = 0; i < lastKeyIndex; ++i) {
            key = keys[i];
            !(key in t) && (t[key] = {});
            t = t[key];
        }

        return t[keys[lastKeyIndex]];
    }
}