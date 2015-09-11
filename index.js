"use strict";

var through         = require('through');
var reactTemplates  = require("react-templates");

function process(file, isRTFile, transformer) {
  var data = '';
  function write(chunk) {
    return data += chunk;
  }

  function compile() {
    // jshint -W040
    if (isRTFile) {
      try {
        var transformed = transformer(data);
        this.queue(transformed);
      } catch (error) {
        error.name = 'ReactTransformify';
        error.message = file + ': ' + error.message;
        error.fileName = file;

        this.emit('error', error);
      }
    } else {
      this.queue(data);
    }
    return this.queue(null);
    // jshint +W040
  }

  return through(write, compile);
}

function getExtensionsMatcher(extensions) {
  return new RegExp('\\.(' + extensions.join('|') + ')$');
}

module.exports = function(file, options) {
  options = options || {};
  options.modules = options.modules || "commonjs";

  var isRTFile;

  var extensions = ['rt']
      .concat(options.extension)
      .concat(options.x)
      .filter(Boolean)
      .map(function(ext) { return ext[0] === '.' ? ext.slice(1) : ext });
  isRTFile = getExtensionsMatcher(extensions).exec(file);

  function transformer(source) {
    // Stripping types needs to happen before the other transforms
    return reactTemplates.convertTemplateToReact(source, options);
  }

  return process(file, isRTFile, transformer);
};
