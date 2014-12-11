/* jshint node:true */
/* global afterEach, describe, it */

var broccoli = require('broccoli');
var autoRegister = require('..');
var fs = require('fs');
var path = require('path');
var should = require('should');

describe('broccoli-ember-auto-register', function() {
  'use strict';

  var builder;

  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('generates a function to register each file in the addon', function() {
    var autoRegisterTree = autoRegister(path.join(__dirname, 'app'), {
      modulePrefix: 'awesomesauce'
    });

    builder = new broccoli.Builder(autoRegisterTree);

    return builder.build().then(function(graph) {
      var actual = fs.readFileSync(path.join(graph.directory, 'register.js'), { encoding: 'utf-8' }).trim();
      var expect = fs.readFileSync(path.join(__dirname, 'fixtures/register.js'), { encoding: 'utf-8' }).trim();

      should(actual).equal(expect);
    });
  });
});
