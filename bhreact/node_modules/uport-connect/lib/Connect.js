'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConnectCore2 = require('./ConnectCore');

var _ConnectCore3 = _interopRequireDefault(_ConnectCore2);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _qrdisplay = require('./util/qrdisplay');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*  Primary object for frontend interactions with uPort. Bundles all neccesary functionality.
*  @extends ConnectCore
*
*/
var Connect = function (_ConnectCore) {
  _inherits(Connect, _ConnectCore);

  /**
   * Instantiates a new uPort connect object.
   *
   * @example
   * import { Connect } from 'uport-connect'
   * const uPort = new Connect('Mydapp')
   * @param       {String}            appName                the name of your app
   * @param       {Object}            [opts]                 optional parameters
   * @param       {Object}            opts.credentials       pre-configured Credentials object from http://github.com/uport-project/uport-js object. Configure this if you need to create signed requests
   * @param       {Function}          opts.signer            signing function which will be used to sign JWT's in the credentials object
   * @param       {String}            opts.clientId          uport identifier for your application this will be used in the default credentials object
   * @param       {Object}            [opts.network='kovan'] network config object or string name, ie. { id: '0x1', registry: '0xab5c8051b9a1df1aab0149f8b0630848b7ecabf6', rpcUrl: 'https://mainnet.infura.io' } or 'kovan', 'mainnet', 'ropsten'.
   * @param       {String}            opts.rpcUrl            JSON rpc url (defaults to https://ropsten.infura.io)
   * @param       {String}            opts.infuraApiKey      Infura API Key (register here http://infura.io/register.html)
   * @param       {Function}          opts.topicFactory      function which generates topics and deals with requests and response
   * @param       {Function}          opts.uriHandler        default function to consume generated URIs for requests, can be used to display QR codes or other custom UX
   * @param       {Function}          opts.mobileUriHandler  default function to consume generated URIs for requests on mobile
   * @param       {Function}          opts.closeUriHandler   default function called after a request receives a response, can be to close QR codes or other custom UX
   * @return      {Connect}                                  self
   */

  function Connect(appName) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Connect);

    var _this = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, appName, opts));

    _this.uriHandler = opts.uriHandler || _qrdisplay.openQr;
    _this.mobileUriHandler = opts.mobileUriHandler || mobileUriHandler;
    _this.closeUriHandler = opts.closeUriHandler || (_this.uriHandler === _qrdisplay.openQr ? _qrdisplay.closeQr : undefined);
    return _this;
  }

  /**
   *  Instantiates and returns a web3 object wrapped with uPort functionality. For
   *  more details see uportSubprovider and getProvider in connectCore.
   *
   *  @return          {web3}    A uPort web3 object
   */


  _createClass(Connect, [{
    key: 'getWeb3',
    value: function getWeb3() {
      var provider = this.getProvider();
      var web3 = new _web2.default();
      web3.setProvider(provider);
      // Work around to issue with web3 requiring a from parameter. This isn't actually used.
      web3.eth.defaultAccount = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087';
      return web3;
    }
  }]);

  return Connect;
}(_ConnectCore3.default);

// TODO may want to make mobileUriHandler available for ConnectCore.
/**
 *  Consumes a URI. Used by default when called on a mobile device. Assigns the window
 *  to the URI which will bring up a dialog to open the URI in the uPort app.
 *
 *  @param    {String}     uri    A uPort URI
 *  @private
 */


function mobileUriHandler(uri) {
  window.location.assign(uri);
}

exports.default = Connect;