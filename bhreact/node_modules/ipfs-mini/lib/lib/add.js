'use strict';

var ipfsAPI = require('ipfs-api');

/**
 * The add method for the IPFS api in nodejs
 * @param {String|Buffer} `inputData` the data to be stored
 * @param {Object} `self` the ipfs instance
 * @param {Function} `callback` the callback
 * @callback {String} `ipfs` returns an IPFS hash string
 */
module.exports = function add(inputData, self, callback) {
  var ipfs = ipfsAPI(self.provider);
  var input = typeof inputData === 'string' ? new Buffer(inputData, 'utf8') : inputData;
  var addCallback = function addCallback(err, result) {
    return callback(err, !err ? result[0].hash : null);
  };

  ipfs.files.add(input, addCallback);
};