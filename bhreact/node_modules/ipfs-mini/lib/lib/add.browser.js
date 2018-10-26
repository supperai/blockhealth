'use strict';

/**
 * The add method for the IPFS api in the browser
 * @param {String|Buffer} `inputData` the data to be stored
 * @param {Object} `self` the ipfs instance
 * @param {Function} `callback` the callback
 * @callback {String} `ipfs` returns an IPFS hash string
 */
module.exports = function add(input, self, callback) {
  var payload = new FormData();
  var data = typeof input === 'object' && input.isBuffer ? input.toString('binary') : input;
  payload.append('file', new Blob([data], {}));
  var addCallback = function addCallback(err, result) {
    return callback(err, !err ? result.Hash : null);
  };

  self.sendAsync({ jsonParse: true, accept: 'application/json', uri: '/add', payload: payload }, addCallback);
};