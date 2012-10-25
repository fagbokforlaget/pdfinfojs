module.exports = process.env.PDFTOHPUB_COV
  ? require('./lib-cov/pdftohpub')
  : require('./lib/pdftohpub');

