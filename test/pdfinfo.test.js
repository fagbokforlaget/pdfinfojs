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

 describe('file_name_with_spaces', function(){
    it('should add options', function(){
      var pinfo = new pdfinfo(__dirname + '/pdfs/sample 1.pdf');
      pinfo.add_options(['--space-as-offset 1', '--css-draw 0', '-h']);
      assert.equal(1, pinfo.options.additional.indexOf('--space-as-offset'));
      assert.equal(3, pinfo.options.additional.indexOf('--css-draw'));
    })
  });


  describe('get_info', function(){
    it('should get pdf info', function(done){
      var pinfo = new pdfinfo(__dirname + '/pdfs/sample.pdf');
      pinfo.getInfo().then(function(ret) {
        assert.equal('4', ret.pages);
        done();
      });
    });
  });

  describe('sync_info', function(){
    it('should get pdf info sync call', function(){
      var pinfo = new pdfinfo(__dirname + '/pdfs/sample.pdf');
      var ret = pinfo.getInfoSync();
      assert.equal('4', ret.pages);
    });
  });


  describe('file_with_spaces_get_info', function(){
    it('should get pdf info', function(done){
      var pinfo = new pdfinfo(__dirname + '/pdfs/sample 1.pdf');
      pinfo.getInfo().then(function(ret) {
        assert.equal('4', ret.pages);
        done();
      });
    });
  });


  describe('error', function(){
    it('should call error callback', function(done){
      var pinfo = new pdfinfo(__dirname + '/pdfs/invalidfile.pdf');
      pinfo.getInfo()
      .catch(function(err) {
        done();
      });
    });

    it('should call error callback when pdfinfo chokes (since it cannot handle a password protected file)', function(done){
      var pinfo = new pdfinfo(__dirname + '/pdfs/pdf-with-password.pdf');
      pinfo.getInfo()
      .catch(function(err) {
        assert.equal(err, 'Command Line Error: Incorrect password\n');
        done();
      });
    });

    it('should call error callback when pdfinfo chokes (since it cannot handle a password protected file) in sync mode', function(done){
      var pinfo = new pdfinfo(__dirname + '/pdfs/pdf-with-password.pdf');
      try {
        var resp = pinfo.getInfoSync();
      } catch (err) {
        done();
      }
    });

    it('should call error when command is not found', async function() {
      var pinfo = new pdfinfo(__dirname + '/pdfs/sample 1.pdf', {command: 'pdfinfofake'});
      try {
        await pinfo.getInfo()
      } catch (err) {
        assert.ok(true)
      }
    });

  });
})
