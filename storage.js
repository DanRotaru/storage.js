/**
 * storage.js — lightweight localstorage API library
 * Copyright: by DanRotaru <https://t.me/danrotaru>
 * Github: <https://github.com/DanRotaru/storage.js>
 * License: Free to use
 */

const storage = {
    name: 'storage.js',
    raw: null,
    type: localStorage,
    init: function (name, type = 'local') {
        this.name = name;
        if(type !== 'local') this.type = sessionStorage;
        this.raw = this.type.getItem(this.name);
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

        this.type.setItem(this.name, JSON.stringify(t));
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

        this.type.setItem(this.name, JSON.stringify(t));
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
    },
    transfer: function(to){
        if (this.raw === null) return false;

        if(to == 1 || to == 'local'){
            sessionStorage.removeItem(this.name);
            localStorage.setItem(this.name, this.raw);
        }
        else if(to == 2 || to == 'session'){
            localStorage.removeItem(this.name);
            sessionStorage.setItem(this.name, this.raw);
        }
        
    }
}
