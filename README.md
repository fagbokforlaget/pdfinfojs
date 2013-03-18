## pdfinfojs - pdfinfo shell wrapper for Node.js
[![Build Status](https://travis-ci.org/fagbokforlaget/pdfinfojs.png)](https://travis-ci.org/fagbokforlaget/pdfinfojs)
pdfinfojs provides access to pdfinfo via shell in nodejs.

### Installation

via npm:

```
$ npm install pdfinfojs
```

### Usage
#### Asynchronus example
```
var pdfinfo = require('pdfinfojs'),
    pdf = new pdfinfo('tests/pdfs/sample.pdf');

pdf.getInfo(function(err, info, params) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(info); //info is an object
    console.log(params); // commandline params passed to pdfinfo cmd
  }
});
```
#### Synchronous Example
```
var pdfinfo = require('pdfinfojs'),
    pdf = new pdfinfo('tests/pdfs/sample.pdf');

var data = pdf.getInfoSync();
console.log(data);

```

### Tests
```
$ npm test
```

Coverage (Make sure you have installed jscoverage (it's easy `sudo aptitude install jscoverage` or `brew jscoverage`)

```
$ npm test-cov
```

