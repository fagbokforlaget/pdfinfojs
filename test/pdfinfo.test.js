var assert = require('assert'),
    fs = require('fs'),
    pdfinfo = require('../lib/pdfinfo.js');

describe('pdfinfo', function(){
  describe('add_options', function(){
    it('should add options', function(){
      var pinfo = new pdfinfo(__dirname + '/pdfs/invalidfile.pdf');
      pinfo.add_options(['--space-as-offset 1', '--css-draw 0', '-h']);
      assert.equal(1, pinfo.options.additional.indexOf('--space-as-offset'));
      assert.equal(3, pinfo.options.additional.indexOf('--css-draw'));
    })
  });


  describe('info', function(){
    it('should get pdf info', function(done){
      var pinfo = new pdfinfo(__dirname + '/pdfs/sample.pdf');

      pinfo.success(function(ret) {
        assert.equal('4', ret.pages);
        done();
      });

      pinfo.error(function(error) {
      });

      pinfo.get();
    });
  });

  describe('error', function(done){
    it('should call error callback', function(){
      var pinfo = new pdfinfo(__dirname + '/pdfs/invalidfile.pdf');

      pinfo.success(function() {
      });

      pinfo.error(function(error) {
        done();
      });

      pinfo.get();
    })
  });

})
