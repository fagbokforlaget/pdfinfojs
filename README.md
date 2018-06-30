## pdfinfojs - pdfinfo shell wrapper for Node.js
[![Build Status](https://travis-ci.org/fagbokforlaget/pdfinfojs.png)](https://travis-ci.org/fagbokforlaget/pdfinfojs)
[![npm module downloads](http://img.shields.io/npm/dt/pdfinfojs.svg)](https://www.npmjs.org/package/pdfinfojs)
[![Dependency Status](https://david-dm.org/fagbokforlaget/pdfinfojs.svg)](https://david-dm.org/fagbokforlaget/pdfinfojs)
[![Build Status](https://travis-ci.org/fagbokforlaget/pdfinfojs.svg)](https://travis-ci.org/fagbokforlaget/pdfinfojs)
[![Known Vulnerabilities](https://snyk.io/test/github/fagbokforlaget/pdfinfojs/badge.svg)](https://snyk.io/test/github/fagbokforlaget/pdfinfojs)
[![view on npm](http://img.shields.io/npm/l/pdfinfojs.svg)](https://www.npmjs.org/package/pdfinfojs)

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

