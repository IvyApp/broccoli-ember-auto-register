# broccoli-ember-auto-register

Automatically register Ember CLI addon files, making them usable from outside
an Ember CLI app.

## Installation

```sh
npm install --save-dev broccoli-ember-auto-register
```

## Usage

```js
var autoRegister = require('broccoli-ember-auto-register');
var registerTree = autoRegister(sourceTree, {
  moduleName: 'my-addon/register',
  modulePrefix: 'my-addon',
  outputFile: 'register.js'
});
```

The above will recursively walk `sourceTree`, adding a `container.register`
call for each file it finds. So, for example, if there is a file named
`components/x-foo.js`, the following will be written to the output file:

```js
container.register('component:x-foo', require('my-addon/components/x-foo')['default']);
```

The topmost directory is used as the type. So if we were to come across a file
named `controllers/foo/edit.js`, the following would be generated:

```js
container.register('controller:foo/edit', require('my-addon/controllers/foo/edit')['default']);
```

In the interest of keeping this plugin small and focused, it **does not**
attempt to filter the files. If you would like to exclude certain files, such
as `.gitkeep`, you can do so with
[broccoli-static-compiler][broccoli-static-compiler] like so:

```js
var autoRegister = require('broccoli-ember-auto-register');
var pickFiles = require('broccoli-static-compiler');
var registerTree = autoRegister(pickFiles(sourceTree, {
  srcDir: '/app',
  files: ['**/*.{handlebars,hbs,js}'],
  destDir: '/'
}), { modulePrefix: 'my-addon' });
```

The above would only include `.handlebars`, `.hbs`, or `.js` files under
`app/`.

### Options

* `moduleName`: What to call the module that exports the initialization
  function. By default this is `modulePrefix` + '/register'.
* `modulePrefix`: Prefix to be added to all `require` statements. Usually this
  is the same as the name of your addon.
* `outputFile`: Where to write the resulting file. By default this is
  'register.js'.

[broccoli-static-compiler]: https://github.com/joliss/broccoli-static-compiler
