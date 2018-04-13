exports = module.exports.trim = trim;

function trim(string) {
  return string.replace(/^\s*|\s*$/g, '')
}

exports = module.exports.slugify = slugify;
function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "_");
  return text;
}

exports = module.exports.parse = function parse(data) {
  let ret = {};
  let lines = data.split(/\r\n|\r|\n/g);

  for (var i=0; i<lines.length-2; i++) {
    var line = lines[i];
    var tup = line.split(': ');
    if (tup.length === 2) {
      ret[slugify(tup[0]).toLowerCase()] = trim(tup[1]);
    }
  }

  return ret;
}
