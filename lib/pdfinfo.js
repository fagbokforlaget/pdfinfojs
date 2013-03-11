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

  pdfinfo.prototype.getSync = function() {
    var self = this;
    var child = shell.exec('pdfinfo ' + self.options.additional.join(' '));
    if (child.code === 0) {
      return utils.parse(child.output);
    }
    else {
      if (!shell.which('pdfinfo')) {
        throw new Error('Sorry, this script requires pdfinfo.');
      }
      throw new Error("pdfinfo error: "+ child.output);
    }
  }

  pdfinfo.prototype.get = function() {
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
