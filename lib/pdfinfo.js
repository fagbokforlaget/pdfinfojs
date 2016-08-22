var shell = require('shelljs');
var utils = require('./utils');

// shelljs only supports silent globally due to a bug
shell.config.silent = true;

function pdfinfo (filename, options) {
  this.options = options || {};
  this.options.additional = ['"' + filename + '"'];

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

  pdfinfo.prototype.getInfoSync = function() {
    var self = this;
    var child = shell.exec('pdfinfo ' + self.options.additional.join(' '));
    if (child.code === 0) {
      return utils.parse(child.stdout);
    }
    else {
      if (!shell.which('pdfinfo')) {
        throw new Error('Sorry, this script requires pdfinfo.');
      }
      throw new Error("pdfinfo error: "+ child.stdout);
    }
  }

  pdfinfo.prototype.getSync = function() {
    console.warn("\033[31m`getSync` is now obsolete please use `getInfoSync` instead. Eventually `getSync` will be soon removed.\033[0m");
    return this.getInfoSync();
  }

  pdfinfo.prototype.getInfo = function(cb) {
    var self = this;
    var child = shell.exec('pdfinfo ' + self.options.additional.join(' '), function(code, data) {
      if (code === 0) {
        data = utils.parse(data);
        if (cb && typeof cb === "function") {
          cb(null, data, self.options.additional);
        }
      }
      else {
        var err;
        if (!shell.which('pdfinfo')) {
          err = new Error('pdfinfo (poppler-utils) is missing. Hint: sudo apt-get install poppler-utils');
        }
        else {
          err = new Error(data);
        }
        if (cb && typeof cb === "function") {
          cb(err, null, self.options.addtional);
        }
      }
    });
  }

  pdfinfo.prototype.get = function() {
    console.warn("\033[31m`get` is now obsolete please use `getInfo` instead. Eventually `get` will be soon removed.\033[0m");
    var self = this;
    var child = shell.exec('pdfinfo ' + self.options.additional.join(' '), function(code, data) {
      if (code === 0) {
        if (self.options.success 
            && typeof self.options.success === "function") {
          self.options.success(utils.parse(data));
        }
      }
      else {
        if (!shell.which('pdfinfo')) {
          echo('Sorry, this script requires pdfinfo.');
        }
        if (self.options.error 
            && typeof self.options.error === "function") {
          self.options.error(data);
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
