/* jshint node:true */
'use strict';

var Writer = require('broccoli-writer');
var fs = require('fs');
var helpers = require('broccoli-kitchen-sink-helpers');
var inflect = require('i')();
var path = require('path');

function EmberAutoRegister(inputTree, options) {
  if (!(this instanceof EmberAutoRegister)) {
    return new EmberAutoRegister(inputTree, options);
  }

  this.inputTree = inputTree;

  options = options || {};
  if (!options.modulePrefix) {
    throw new Error('modulePrefix must be defined');
  }

  this.inputFiles = options.inputFiles || ['**/*.{handlebars,hbs,js}'];
  this.modulePrefix = options.modulePrefix;
  this.moduleName = options.moduleName || this.modulePrefix + '/register';
  this.outputFile = options.outputFile || 'register.js';
}

EmberAutoRegister.prototype = Object.create(Writer.prototype);
EmberAutoRegister.prototype.constructor = EmberAutoRegister;

EmberAutoRegister.prototype.write = function(readTree, destDir) {
  var inputFiles = this.inputFiles;
  var moduleName = this.moduleName;
  var modulePrefix = this.modulePrefix;
  var outputFile = this.outputFile;

  return readTree(this.inputTree).then(function(srcDir) {
    var output = [];
    output.push('/* global define, require */');
    output.push("define('" + moduleName + "', ['exports'], function(__exports__) {");
    output.push("  'use strict';");
    output.push("  __exports__['default'] = function(container) {");
    helpers.multiGlob(inputFiles, { cwd: srcDir }).forEach(function(filename) {
      var parts = filename.split(path.sep);
      var ext = path.extname(filename);
      var key = inflect.singularize(parts[0]) + ':' + parts.slice(1).join('/').replace(ext, '');
      var mod = [modulePrefix].concat(parts).join('/').replace(ext, '');
      output.push("    container.register('" + key + "', require('" + mod + "')['default']);");
    });
    output.push('  };');
    output.push('});');
    fs.writeFileSync(path.join(destDir, outputFile), output.join('\n'));
  });
};

module.exports = EmberAutoRegister;
