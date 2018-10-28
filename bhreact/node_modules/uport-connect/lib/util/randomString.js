'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomString;
/**
 * Generate a random string
 */
function randomString(length) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }return result;
}