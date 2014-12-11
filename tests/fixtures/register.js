/* global define, require */
define('awesomesauce/register', ['exports'], function(__exports__) {
  'use strict';
  __exports__['default'] = function(container) {
    container.register('component:x-foo', require('awesomesauce/components/x-foo')['default']);
    container.register('controller:foo', require('awesomesauce/controllers/foo')['default']);
    container.register('helper:foo', require('awesomesauce/helpers/foo')['default']);
    container.register('model:foo', require('awesomesauce/models/foo')['default']);
    container.register('route:foo', require('awesomesauce/routes/foo')['default']);
    container.register('template:components/x-foo', require('awesomesauce/templates/components/x-foo')['default']);
    container.register('template:foo', require('awesomesauce/templates/foo')['default']);
    container.register('view:foo', require('awesomesauce/views/foo')['default']);
  };
});
