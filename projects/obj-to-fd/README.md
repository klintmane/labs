
# obj-to-fd [![npm version](https://badge.fury.io/js/obj-to-fd.svg)](https://badge.fury.io/js/obj-to-fd)
Clean and minimalist utility to convert a plain JavaScript Object into a FormData Object (multipart/form-data).

- Functional
- Recursive
- No dependencies
- ~ 20 LOC

## Usage
Importing the utility:

```js
const objToFd = require('obj-to-fd');
```

Converting obj to a FormData Object:

```js
const obj = { person: { name: "Bob", age: 25, children: ["Sarah", "Kyle"] } };
const fData = objToFd(obj);

// fData will look something like:
// person[name]: "Bob", person[age]: "25", person[children][]: "Sarah", person[children][]: "Kyle" ...
```

## Nesting
Nested objects are handled elegantly by recursion.
Note: As a FormData Object cannot contain an Object entry, some cases like arrays of Objects (i.e. `[{key: val}, {key: val}]`) have to be parsed before either by:
- Converting the above to two seperate arrays `obj[keys][]` and `obj[values][]`
- Converting the above to use indices as keys `obj[0][key]`, `obj[1][key]` etc.

