'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mnid = require('mnid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*  A web3 style provider which can easily be wrapped with uPort functionality.
*  Builds on a base provider. Used in Connect to wrap a provider with uPort specific
*  functionality.
*/
var UportSubprovider = function () {
  /**
   * Instantiates a new wrapped provider
   *
   * @param       {Object}            args                   required arguments
   * @param       {Function}          args.requestAddress    function to get the address of a uPort identity.
   * @param       {Function}          args.sendTransaction   function to handle passing transaction information to a uPort application
   * @param       {Object}            args.provider          a web3 sytle provider
   * @return      {UportSubprovider}                         self
   */
  function UportSubprovider(_ref) {
    var _this = this;

    var requestAddress = _ref.requestAddress,
        sendTransaction = _ref.sendTransaction,
        provider = _ref.provider,
        networkId = _ref.networkId;

    _classCallCheck(this, UportSubprovider);

    var self = this;
    this.provider = provider;
    this.networkId = networkId;
    this.getAddress = function (cb) {
      if (self.address) return cb(null, self.address);
      requestAddress().then(function (address) {
        var errorMatch = new Error('Address/Account received does not match the network your provider is configured for');
        _this.setAccount(address) ? cb(null, self.address) : cb(errorMatch);
      }, function (error) {
        return cb(error);
      });
    };

    this.sendTransaction = function (txobj, cb) {
      sendTransaction(txobj).then(function (address) {
        return cb(null, address);
      }, function (error) {
        return cb(error);
      });
    };
  }

  _createClass(UportSubprovider, [{
    key: 'setAccount',
    value: function setAccount(address) {
      if (this.networkId && (0, _mnid.isMNID)(address)) {
        var mnid = (0, _mnid.decode)(address);
        if (this.networkId === mnid.network) {
          this.address = mnid.address;
          return true;
        }
        return false;
      }
      // Does not force validation, if no network id given will still set address
      this.address = (0, _mnid.isMNID)(address) ? (0, _mnid.decode)(address).address : address;
      return true;
    }

    /**
     *  Synchronous functionality not supported
     */

  }, {
    key: 'send',
    value: function send(payload) {
      throw new Error('Uport Web3 SubProvider does not support synchronous requests.');
    }

    /**
     *  Overrides sendAsync to caputure the following RPC calls eth_coinbase, eth_accounts,
     *  and eth_sendTransaction. All other calls are passed to the based provider.
     *  eth_coinbase, eth_accounts will get a uPort identity address with getAddress.
     *  While eth_sendTransaction with send transactions to a uPort app with sendTransaction
     *
     * @param       {Any}            payload           request payload
     * @param       {Function}       callback          called with response or error
     */

  }, {
    key: 'sendAsync',
    value: function sendAsync(payload, callback) {
      var self = this;
      var respond = function respond(error, result) {
        if (error) {
          callback({
            id: payload.id,
            jsonrpc: '2.0',
            error: error.message
          });
        } else {
          callback(null, {
            id: payload.id,
            jsonrpc: '2.0',
            result: result
          });
        }
      };
      if (Array.isArray(payload)) {
        _async2.default.map(payload, self.sendAsync.bind(self), callback);
        return;
      }
      switch (payload.method) {
        // TODO consider removing, not necessary for interaction with uport
        case 'eth_coinbase':
          return self.getAddress(respond);
        case 'eth_accounts':
          return self.getAddress(function (error, address) {
            respond(error, [address]);
          });
        case 'eth_sendTransaction':
          var txParams = payload.params[0];
          return self.sendTransaction(txParams, function (err, tx) {
            respond(err, tx);
          });
        default:
          self.provider.sendAsync(payload, callback);
      }
    }
  }]);

  return UportSubprovider;
}();

exports.default = UportSubprovider;