exports = module.exports.trim = function trim(string) {
  return string.replace(/^\s*|\s*$/g, '')
}

exports = module.exports.slugify = slugify;
function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "_");
  return text;
}