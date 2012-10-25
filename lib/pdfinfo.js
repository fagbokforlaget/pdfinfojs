require('shelljs/global');
var utils = require('./utils');

function pdfinfo (filename, options) {
  this.options = options || {};
  this.options.additional = [filename];

  pdfinfo.prototype.add_options = function(optionArray) {
    if (typeof optionArray.length !== undefined) {
        var self = this;
        optionArray.forEach(function(el) {
          if (el.indexOf(' ') > 0) {
            var values = el.split(' ');
            self.options.additional.push(values[0], values[1]);
          } else {
            self.options.additional.push(el);
          }
        });
    }
    return this;
  };

  pdfinfo.prototype.get = function() {
    var self = this;
    var child = exec('pdfinfo ' + self.options.additional.join(' '), {async:true, silent:true});
    
    var error = '';
    var ret = {};

    child.stdout.on('data', function(data){
      var lines = data.split(/\r\n|\r|\n/g);
      for (var i=0; i<lines.length-2; i++) {
        var line = lines[i];
        var tup = line.split(': ');
        if (tup.length === 2) {
          ret[utils.slugify(tup[0]).toLowerCase()] = utils.trim(tup[1]); 
        }
      }
    });

    child.stderr.on('data', function(data){
      error += data;
    });

    child.on('exit', function(code, signal){
      if (code === 0) {
        if (self.options.success 
            && typeof self.options.success === "function") {
          self.options.success(ret);
        }
      }
      else {
        if (!which('pdfinfo')) {
          echo('Sorry, this script requires pdfinfo.');
        }
        if (self.options.error 
            && typeof self.options.error === "function") {
          self.options.error(error);  
        }
      }

    });
  };

  pdfinfo.prototype.error = function(callback) {
    this.options.error = callback;
    return this;
  };

  pdfinfo.prototype.success = function(callback) {
    this.options.success = callback;
    return this;
  };
}

// module exports
exports = module.exports = function(filename, args) {
  return new pdfinfo(filename, args);
};
