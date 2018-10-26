'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.decode = decode;
exports.isMNID = isMNID;

var _jsSha = require('js-sha3');

var _buffer = require('buffer');

var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var base58 = require('base-x')(BASE58);
var hex = require('base-x')('0123456789abcdef');

function checksum(payload) {
  return new _buffer.Buffer((0, _jsSha.sha3_256)(_buffer.Buffer.concat(payload)), 'hex').slice(0, 4);
}

function encode(_ref) {
  var network = _ref.network,
      address = _ref.address;

  var payload = [new _buffer.Buffer('01', 'hex'), hex.decode(network.slice(2)), new _buffer.Buffer(address.slice(2), 'hex')];
  payload.push(checksum(payload));
  return base58.encode(_buffer.Buffer.concat(payload));
}

function decode(encoded) {
  var data = _buffer.Buffer.from(base58.decode(encoded));
  var netLength = data.length - 24;
  var version = data.slice(0, 1);
  var network = data.slice(1, netLength);
  var address = data.slice(netLength, 20 + netLength);
  var check = data.slice(netLength + 20);
  if (check.equals(checksum([version, network, address]))) {
    return {
      network: '0x' + hex.encode(network),
      address: '0x' + address.toString('hex')
    };
  } else {
    throw new Error('Invalid address checksum');
  }
}

function isMNID(encoded) {
  try {
    var data = _buffer.Buffer.from(base58.decode(encoded));
    return data.length > 24 && data[0] === 1;
  } catch (e) {
    return false;
  }
}