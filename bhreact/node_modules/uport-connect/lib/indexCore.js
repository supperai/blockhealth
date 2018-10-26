'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MNID = exports.Credentials = exports.SimpleSigner = exports.QRUtil = exports.ConnectCore = exports.Connect = undefined;

var _ConnectCore = require('./ConnectCore');

var _ConnectCore2 = _interopRequireDefault(_ConnectCore);

var _mnid = require('mnid');

var _uport = require('uport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notSupported = function notSupported(obj) {
  return function () {
    throw new Error(obj + ' not suported in uport-connect core, use full uport-connect library or ConnectCore object');
  };
};

var Connect = function Connect() {
  _classCallCheck(this, Connect);

  notSupported('Connect object');
};

var QRUtil = { getQRDataURI: notSupported('getQRDataURI'), closeQr: notSupported('closeQr'), openQr: notSupported('openQr') };

var MNID = { encode: _mnid.encode, decode: _mnid.decode, isMNID: _mnid.isMNID };
exports.Connect = Connect;
exports.ConnectCore = _ConnectCore2.default;
exports.QRUtil = QRUtil;
exports.SimpleSigner = _uport.SimpleSigner;
exports.Credentials = _uport.Credentials;
exports.MNID = MNID;