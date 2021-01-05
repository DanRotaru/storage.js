# Storage.js
Storage.js - the smallest, lightweight library to interactive with LocalStorage API.

## Init
All data's are stocked in one localStorage key. By default localStorage key name is storage.js
```javascript
storage.init("Storage name", "local");

// Seccond argument is optional (local || session), by default is local
```

## Get all data
```javascript
// In string format
storage.raw();

// In JSON format
storage.json();
```
## Set/update value
`value` (string) &mdash; data value
`key` (string) &mdash; key value.
```javascript
// Add some local data
storage.add(value, key);

// The same function
storage.update(value, key)
```

## Get value
`key` (string) &mdash; key value.
```javascript
storage.get(key);
```
## Remove data
`key` (string) &mdash; key value.
```javascript
storage.remove(key);
```
## Transfer data from sessionStorage to localStorage and conversely
`to` (string) &mdash; transfer data to ("local" || "session").
```javascript
storage.transfer(to);
```
In all functions, `key` can also contain multiple object location.
E.g. `someKey`, `user.name`, `user.settings.theme`
```javascript
storage.add("some value", "someKey");
storage.add("Dan", "user.name");
storage.add("dark", "user.settings.theme");
```
![set/update value](https://i.ibb.co/S6YPSK7/image.png)

## P.S.
It is important to use storage, not Storage name, because it is used, or you can change object name storage to whatever you want.
## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
Created by [DanRotaru](https://t.me/danrotaru).
