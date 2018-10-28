tweetnacl-util-js
=================

String encoding utilities extracted from <https://github.com/dchest/tweetnacl-js>

Encoding/decoding functions are provided for convenience. They are correct,
however their performance and wide compatibility with uncommon runtimes is not
something that is considered important compared to the simplicity and size of
implementation. **Please use better third-party libraries if you need to.**

Installation
------------

Use a package manager:

[Bower](http://bower.io):

    $ bower install tweetnacl-util

[NPM](https://www.npmjs.org/):

    $ npm install tweetnacl-util

or [download source code](https://github.com/dchest/tweetnacl-util-js/releases).


Usage
------

To make keep backward compatibility with code that used `nacl.util` previously
included with TweetNaCl.js, just include it as usual:

```
<script src="nacl.min.js"></script>
<script src="nacl-util.min.js"></script>
<script>
  // nacl.util functions are now available, e.g.:
  // nacl.util.decodeUTF8
</script>
```

When using CommonJS:

```
var nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
```


Documentation
-------------

#### nacl.util.decodeUTF8(string)

Decodes string and returns `Uint8Array` of bytes.

#### nacl.util.encodeUTF8(array)

Encodes `Uint8Array` or `Array` of bytes into string.

#### nacl.util.decodeBase64(string)

Decodes Base-64 encoded string and returns `Uint8Array` of bytes.

#### nacl.util.encodeBase64(array)

Encodes `Uint8Array` or `Array` of bytes into string using Base-64 encoding.
