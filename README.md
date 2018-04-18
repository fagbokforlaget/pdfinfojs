## pdfinfojs - pdfinfo shell wrapper for Node.js
[![Build Status](https://travis-ci.org/fagbokforlaget/pdfinfojs.png)](https://travis-ci.org/fagbokforlaget/pdfinfojs)
pdfinfojs provides access to pdfinfo via shell in nodejs.

### Installation

via npm:

```
$ npm install pdfinfojs
```

### Usage
```javascript
const pdfinfo = require('pdfinfojs');
const pdf = new pdfinfo('test/pdfs/sample.pdf');

pdf.getInfo()
.then(function (info) { // return Promise
  console.log(info);
})
.catch(function (err) {
  console.err(err);
});
```

### Tests
```
$ npm test
```

