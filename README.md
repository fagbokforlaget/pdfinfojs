## pdfinfojs - pdfinfo shell wrapper for Node.js

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
    info = new pdfinfo('tests/pdfs/sample.pdf');

info.success(function(i) {
  console.log(i);
});

info.error(function(error) {
  console.log("conversion error: " + error);
});

info.get();
```
#### Synchronous Example
```
var pdfinfo = require('pdfinfojs'),
    info = new pdfinfo('tests/pdfs/sample.pdf');

var data = info.getSync();
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

