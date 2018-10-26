[![build status][travis-image]][travis-url]
[![test coverage][coveralls-image]][coveralls-url]
[![npm][npm-image]][npm-url]

# eslint-plugin-no-unused-vars-rest

## DEPRECATED: As of ESLint 3.15.0 this functionality is [supported by the core no-unused-vars rule](http://eslint.org/docs/rules/no-unused-vars#ignorerestsiblings).

An enhanced version of the [ESLint core rule no-unused-vars](http://eslint.org/docs/rules/no-unused-vars) with allowances for experimental object rest properties.

This plugin provides a single rule which functions the same as the core rule `no-unused-vars`, except it adds the `ignoreDestructuredVarsWithRest` option. Enabling this option will allow unused variables appearing in destructuring assignments that also contain experimental rest properties. This is useful for shallow-cloning an object while omitting certain properties.


## Installation

Install [ESLint](http://eslint.org) and `eslint-plugin-no-unused-vars-rest`:

```
$ npm install --save-dev eslint eslint-plugin-no-unused-vars-rest
```

## Usage

Add `no-unused-vars-rest` to the plugins section of your `.eslintrc` configuration file, and configure the rule under the rules section. Don't forget to disable the core rule `no-unused-vars`.

```json
{
  "plugins": [
    "no-unused-vars-rest"
  ],
  "rules": {
    "no-unused-vars": 0,
    "no-unused-vars-rest/no-unused-vars": [2, {"ignoreDestructuredVarsWithRest": true}]
  }
}
```

Alternatively you may use the plugin's recommended configuration, which applies the above configuration.

```json
{
  "extends": ["plugin:no-unused-vars-rest/recommended"]
}
```


When **not** using this rule the following pattern is considered a problem by the core rule `no-unused-vars`:

```js
const { extra, ...rest } = blah; // Error 'extra' is defined but never used.
return rest;
```

When using this rule with `ignoreDestructuredVarsWithRest: true` the following pattern is acceptable:
```js
const { extra, ...rest } = blah;
return rest;
```

[travis-image]: https://img.shields.io/travis/bryanrsmith/eslint-plugin-no-unused-vars-rest/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/bryanrsmith/eslint-plugin-no-unused-vars-rest
[coveralls-image]: https://img.shields.io/coveralls/bryanrsmith/eslint-plugin-no-unused-vars-rest/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/bryanrsmith/eslint-plugin-no-unused-vars-rest?branch=master
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-no-unused-vars-rest.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/eslint-plugin-no-unused-vars-rest
