const { execFile, execFileSync } = require('child_process');
const utils = require('./utils');

function pdfinfo (filename, options) {
  this.options = options || {};
  this.options.additional = [filename];
  this.command = this.options.command || 'pdfinfo';

  pdfinfo.prototype.add_options = function(optionArray) {
    const self = this;

    if (typeof optionArray.length !== undefined) {
        optionArray.forEach(function(el) {
          if (el.indexOf(' ') > 0) {
            const values = el.split(' ');
            self.options.additional.push(values[0], values[1]);
          } else {
            self.options.additional.push(el);
          }
        });
    }

    return this;
  }

  pdfinfo.prototype.getInfoSync = function() {
    console.warn("Depreceated: This method will be removed in future. Please use async await feature")

    try {
      const data = execFileSync(this.command, this.options.additional).toString('utf8');
      return utils.parse(data);
    }
    catch(err) {
      throw new Error("pdfinfojs error: "+ err.msg);
    }
  }

  pdfinfo.prototype.getInfo = function() {
    const self = this;

    return new Promise((resolve, reject) => {
      let child = execFile(self.command, self.options.additional, (error, stdout, stderr) => {
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
