"use strict";

var assert      = require('assert');
var browserify  = require('browserify');
var reactTemplatify    = require('../index');

describe('react-templatify', function() {

  function bundle(entry, cb) {
    return browserify(entry, {basedir: __dirname})
      .transform(reactTemplatify)
      .bundle(cb);
  }

  function normalizeWhitespace(src) {
    return src.replace(/\n/g, '').replace(/ +/g, '');
  }

  function assertContains(bundle, code) {
    code = normalizeWhitespace(code);
    bundle = normalizeWhitespace(bundle);
    assert(bundle.indexOf(code) > -1, "bundle does not contain: " + code);
  }

  it('works for *.js', function(done) {
    bundle('./fixtures/main.rt', function(err, result) {
      assert(!err);
      assert(result);
      assertContains(result, "React.createElement('h1', {}, 'Hello, world!')");
      console.log("executed");
      done();
    });
  });
});
