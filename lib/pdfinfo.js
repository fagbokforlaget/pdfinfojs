const { execFile, execFileSync } = require('child_process');
const utils = require('./utils');

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

  pdfinfo.prototype.getInfoSync = function() {
    console.warn("Depreceated: This method will be removed in future. Please use async await feature")
    const self = this;
    try {
      let data = execFileSync('pdfinfo', self.options.additional).toString('utf8');
        return utils.parse(data);
    } catch(err) {
        throw new Error("pdfinfo error: "+ err.msg);
    }
  }


  pdfinfo.prototype.getInfo = function() {
    let self = this;

    return new Promise((resolve, reject) => {
      let child = execFile('pdfinfo', self.options.additional, (error, stdout, stderr) => {
        if (!error && !stderr) {
          resolve(utils.parse(stdout));
        } else if (stderr) {
          reject(stderr);
        } else {
          console.warn('pdfinfo (poppler-utils) might be missing. Hint: sudo apt-get install poppler-utils');
          reject(error);
        }
      });
    });
  }
}

// module exports
exports = module.exports = function(filename, args) {
  return new pdfinfo(filename, args);
};
