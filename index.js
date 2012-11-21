module.exports = process.env.PDFINFO_COV
  ? require('./lib-cov/pdfinfo')
  : require('./lib/pdfinfo');

