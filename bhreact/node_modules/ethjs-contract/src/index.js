const abi = require('ethjs-abi'); // eslint-disable-line
const keccak256 = require('js-sha3').keccak_256; // eslint-disable-line
const EthFilter = require('ethjs-filter'); // eslint-disable-line
const getKeys = require('ethjs-util').getKeys; // eslint-disable-line
const arrayContainsArray = require('ethjs-util').arrayContainsArray;

function hasTransactionObject(args) {
  const txObjectProperties = ['from', 'to', 'data', 'value', 'gasPrice', 'gas'];
  if (typeof args === 'object' && Array.isArray(args) === true && args.length > 0) {
    if (typeof args[args.length - 1] === 'object'
      && (Object.keys(args[args.length - 1]).length === 0
      || arrayContainsArray(Object.keys(args[args.length - 1]), txObjectProperties, true))) {
      return true;
    }
  }

  return false;
}

function getConstructorFromABI(contractABI) {
  return contractABI.filter((json) => (json.type === 'constructor'))[0];
}

function getCallableMethodsFromABI(contractABI) {
  return contractABI.filter((json) => ((json.type === 'function' || json.type === 'event') && json.name.length > 0));
}

function contractFactory(query) {
  return function ContractFactory(contractABI, contractBytecode, contractDefaultTxObject) {
    if (!Array.isArray(contractABI)) { throw new Error(`[ethjs-contract] Contract ABI must be type Array, got type ${typeof contractABI}`); }
    if (typeof contractBytecode !== 'undefined' && typeof contractBytecode !== 'string') { throw new Error(`[ethjs-contract] Contract bytecode must be type String, got type ${typeof contractBytecode}`); }
    if (typeof contractDefaultTxObject !== 'undefined' && typeof contractDefaultTxObject !== 'object') { throw new Error(`[ethjs-contract] Contract default tx object must be type Object, got type ${typeof contractABI}`); }

    const output = {};
    output.at = function atContract(address) {
      function Contract() {
        const self = this;
        self.abi = contractABI || [];
        self.query = query;
        self.address = address || '0x';
        self.bytecode = contractBytecode || '0x';
        self.defaultTxObject = contractDefaultTxObject || {};
        self.filters = new EthFilter(query);

        getCallableMethodsFromABI(contractABI).forEach((methodObject) => {
          self[methodObject.name] = function contractMethod() { // eslint-disable-line
            var queryMethod = 'call'; // eslint-disable-line
            var providedTxObject = {}; // eslint-disable-line
            var methodCallback = () => {}; // eslint-disable-line
            const methodArgs = [].slice.call(arguments); // eslint-disable-line
            if (typeof methodArgs[methodArgs.length - 1] === 'function') {
              methodCallback = methodArgs.pop();
            }

            if (methodObject.type === 'function') {
              return new Promise((resolve, reject) => {
                function newMethodCallback(callbackError, callbackResult) {
                  if (queryMethod === 'call' && !callbackError) {
                    try {
                      const decodedMethodResult = abi.decodeMethod(methodObject, callbackResult);

                      resolve(decodedMethodResult);
                      methodCallback(null, decodedMethodResult);
                    } catch (decodeFormattingError) {
                      const decodingError = new Error(`[ethjs-contract] while formatting incoming raw call data ${JSON.stringify(callbackResult)} ${decodeFormattingError}`);

                      reject(decodingError);
                      methodCallback(decodingError, null);
                    }
                  } else if (queryMethod === 'sendTransaction' && !callbackError) {
                    resolve(callbackResult);
                    methodCallback(null, callbackResult);
                  } else {
                    reject(callbackError);
                    methodCallback(callbackError, null);
                  }
                }

                if (hasTransactionObject(methodArgs)) providedTxObject = methodArgs.pop();
                const methodTxObject = Object.assign({},
                  self.defaultTxObject,
                  providedTxObject, {
                    to: self.address,
                  });
                methodTxObject.data = abi.encodeMethod(methodObject, methodArgs);

                if (methodObject.constant === false) {
                  queryMethod = 'sendTransaction';
                }

                query[queryMethod](methodTxObject, newMethodCallback);
              });
            } else if (methodObject.type === 'event') {
              const filterInputTypes = getKeys(methodObject.inputs, 'type', false);
              const filterTopic = `0x${keccak256(`${methodObject.name}(${filterInputTypes.join(',')})`)}`;
              const filterTopcis = [filterTopic];
              const argsObject = Object.assign({}, methodArgs[0]) || {};

              return new self.filters.Filter(Object.assign({}, argsObject, {
                decoder: (logData) => abi.decodeEvent(methodObject, logData, filterTopcis),
                defaultFilterObject: Object.assign({}, (methodArgs[0] || {}), {
                  to: self.address,
                  topics: filterTopcis,
                }),
              }));
            }
          };
        });
      }

      return new Contract();
    };

    output.new = function newContract() {
      var providedTxObject = {}; // eslint-disable-line
      var newMethodCallback = () => {}; // eslint-disable-line
      const newMethodArgs = [].slice.call(arguments); // eslint-disable-line
      if (typeof newMethodArgs[newMethodArgs.length - 1] === 'function') newMethodCallback = newMethodArgs.pop();
      if (hasTransactionObject(newMethodArgs)) providedTxObject = newMethodArgs.pop();
      const constructMethod = getConstructorFromABI(contractABI);
      const assembleTxObject = Object.assign({}, contractDefaultTxObject, providedTxObject);

      // if contract bytecode was predefined
      if (contractBytecode) {
        assembleTxObject.data = contractBytecode;
      }

      // if constructor bytecode
      if (constructMethod) {
        const constructBytecode = abi.encodeParams(getKeys(constructMethod.inputs, 'type'), newMethodArgs).substring(2); // eslint-disable-line
        assembleTxObject.data = `${assembleTxObject.data}${constructBytecode}`;
      }

      return query.sendTransaction(assembleTxObject, newMethodCallback);
    };

    return output;
  };
}

function EthContract(query) {
  return contractFactory(query);
}

module.exports = EthContract;
