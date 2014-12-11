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
  inputFiles: ['**/*.{handlebars,hbs,js}'],
  moduleName: 'my-addon/register',
  modulePrefix: 'my-addon',
  outputFile: 'register.js'
});
```

### Options

* `inputFiles`: Array of file globs specifying which files to import. By
  default, `.js`, `.handlebars`, and `.hbs` files are matched.
* `moduleName`: What to call the module that exports the initialization
  function. By default this is `modulePrefix` + '/register'.
* `modulePrefix`: Prefix to be added to all `require` statements. Usually this
  is the same as the name of your addon.
* `outputFile`: Where to write the resulting file.
