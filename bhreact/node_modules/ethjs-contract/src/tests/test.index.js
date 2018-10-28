const EthContract = require('../index.js');
const Eth = require('ethjs-query');
const TestRPC = require('ethereumjs-testrpc');
const provider = TestRPC.provider();
const assert = require('chai').assert;
const BN = require('bn.js'); // eslint-disable-line
const server = TestRPC.server();
const HttpProvider = require('ethjs-provider-http');
server.listen(5001);

describe('EthContract', () => {
  describe('should function normally', () => {
    it('should construct properly', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              assert.equal(typeof simpleStore.abi, 'object');
              assert.equal(typeof simpleStore.address, 'string');
              assert.equal(simpleStore.address, receipt.contractAddress);
              assert.equal(typeof simpleStore.set, 'function');
              assert.equal(typeof simpleStore.get, 'function');
              assert.equal(typeof simpleStore.SetComplete, 'function');

              simpleStore.set(setNumberValue, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');

                setTimeout(() => {
                  eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
                    assert.equal(setTxReceiptError, null);
                    assert.equal(typeof setTxReceipt, 'object');

                    simpleStore.get((getError, getResult) => {
                      assert.equal(getError, null);
                      assert.equal(typeof getResult, 'object');
                      assert.equal(getResult[0].toNumber(10), setNumberValue);
                      done();
                    });
                  });
                }, 300);
              });
            });
          }, 1500);
        });
      });
    });

    it('should work normally with promises', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new()
        .catch((newError) => {
          assert.equal(newError, null);
        })
        .then((newResult) => {
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult).catch((errorReceipt) => {
              assert.equal(errorReceipt, null);
            }).then((receipt) => {
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              assert.equal(typeof simpleStore.abi, 'object');
              assert.equal(typeof simpleStore.address, 'string');
              assert.equal(simpleStore.address, receipt.contractAddress);
              assert.equal(typeof simpleStore.set, 'function');
              assert.equal(typeof simpleStore.get, 'function');
              assert.equal(typeof simpleStore.SetComplete, 'function');

              simpleStore.set(setNumberValue)
              .catch((setError) => {
                assert.equal(setError, null);
              })
              .then((setResult) => {
                assert.equal(typeof setResult, 'string');

                setTimeout(() => {
                  eth.getTransactionReceipt(newResult)
                  .catch((setTxReceiptError) => {
                    assert.equal(setTxReceiptError, null);
                  })
                  .then((setTxReceipt) => {
                    assert.equal(typeof setTxReceipt, 'object');

                    simpleStore.get()
                    .catch((getError) => {
                      assert.equal(getError, null);
                    })
                    .then((getResult) => {
                      assert.equal(typeof getResult, 'object');
                      assert.equal(getResult[0].toNumber(10), setNumberValue);
                      done();
                    });
                  });
                }, 300);
              });
            });
          }, 1500);
        });
      });
    });

    it('should catch watch error under promise', (done) => {
      // because test rpc was not funcitoning properly, I had to make another provider
      function FakeProvider() {
        const self = this;
        self.provider = new HttpProvider('http://localhost:5001');
      }

      FakeProvider.prototype.sendAsync = function sendAsync(payload, callback) {
        const self = this;
        const parsedPayload = payload;

        if (parsedPayload.method === 'eth_getFilterChanges') {
          self.provider.sendAsync(payload, () => {
            const fakeEventLog = {
              id: parsedPayload.id,
              jsonrpc: parsedPayload.jsonrpc,
              error: 'invalid data',
            };

            callback(null, fakeEventLog);
          });
        } else {
          self.provider.sendAsync(payload, callback);
        }
      };

      const eth = new Eth(new FakeProvider());
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              assert.equal(typeof simpleStore.abi, 'object');
              assert.equal(typeof simpleStore.address, 'string');
              assert.equal(simpleStore.address, receipt.contractAddress);
              assert.equal(typeof simpleStore.set, 'function');
              assert.equal(typeof simpleStore.get, 'function');
              assert.equal(typeof simpleStore.SetComplete, 'function');

              const setCompleteEvent = simpleStore.SetComplete(); // eslint-disable-line

              assert.equal(typeof setCompleteEvent.new, 'function');
              assert.equal(typeof setCompleteEvent.watch, 'function');
              assert.equal(typeof setCompleteEvent.uninstall, 'function');
              assert.equal(typeof setCompleteEvent.at, 'function');

              setCompleteEvent.new({fromBlock: 'earliest', toBlock: 'latest'}, (setCompleteError, setCompleteResult) => { // eslint-disable-line
                assert.equal(setCompleteError, null);
                assert.equal(typeof setCompleteResult, 'object');
                assert.equal(setCompleteResult.toString(10) > 0, true);
              });

              setCompleteEvent.watch()
              .catch((err) => {
                assert.equal(typeof err, 'object');

                setCompleteEvent.uninstall((stopWatchingError) => {
                  assert.equal(stopWatchingError, null);

                  done();
                });
              });

              simpleStore.set(setNumberValue, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');
              });
            });
          }, 1500);
        });
      });
    });

    it('should catch watch error under promise invalid decode', (done) => {
      // because test rpc was not funcitoning properly, I had to make another provider
      function FakeProvider() {
        const self = this;
        self.provider = new HttpProvider('http://localhost:5001');
      }

      FakeProvider.prototype.sendAsync = function sendAsync(payload, callback) {
        const self = this;
        const parsedPayload = payload;

        if (parsedPayload.method === 'eth_getFilterChanges') {
          self.provider.sendAsync(payload, () => {
            const fakeEventLog = {
              id: parsedPayload.id,
              jsonrpc: parsedPayload.jsonrpc,
              result: [{
                logIndex: '0x0',
                blockNumber: '0x1b4',
                blockHash: '0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d54',
                transactionHash: '0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dc23f',
                transactionIndex: '0x0',
                address: '0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d',
                data: '0xkjdsfkjfskjs',
                topics: ['0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5'],
              }],
            };

            callback(null, fakeEventLog);
          });
        } else {
          self.provider.sendAsync(payload, callback);
        }
      };

      const eth = new Eth(new FakeProvider());
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              assert.equal(typeof simpleStore.abi, 'object');
              assert.equal(typeof simpleStore.address, 'string');
              assert.equal(simpleStore.address, receipt.contractAddress);
              assert.equal(typeof simpleStore.set, 'function');
              assert.equal(typeof simpleStore.get, 'function');
              assert.equal(typeof simpleStore.SetComplete, 'function');

              const setCompleteEvent = simpleStore.SetComplete(); // eslint-disable-line
              setCompleteEvent.new({fromBlock: 'earliest', toBlock: 'latest'}, (setCompleteError, setCompleteResult) => { // eslint-disable-line
                assert.equal(setCompleteError, null);
                assert.equal(typeof setCompleteResult, 'object');
                assert.equal(setCompleteResult.toString(10) > 0, true);
              });
              setCompleteEvent.watch().catch((err) => {
                assert.equal(typeof err, 'object');

                setCompleteEvent.uninstall((stopWatchingError) => {
                  assert.equal(stopWatchingError, null);

                  done();
                });
              });

              simpleStore.set(setNumberValue, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');
              });
            });
          }, 1500);
        });
      });
    });

    it('should catch event watch error', (done) => {
      // because test rpc was not funcitoning properly, I had to make another provider
      function FakeProvider() {
        const self = this;
        self.provider = new HttpProvider('http://localhost:5001');
      }

      FakeProvider.prototype.sendAsync = function sendAsync(payload, callback) {
        const self = this;
        const parsedPayload = payload;

        if (parsedPayload.method === 'eth_getFilterChanges') {
          self.provider.sendAsync(payload, () => {
            const fakeEventLog = {
              id: parsedPayload.id,
              jsonrpc: parsedPayload.jsonrpc,
              error: 'invalid data',
            };

            callback(null, fakeEventLog);
          });
        } else {
          self.provider.sendAsync(payload, callback);
        }
      };

      const eth = new Eth(new FakeProvider());
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              assert.equal(typeof simpleStore.abi, 'object');
              assert.equal(typeof simpleStore.address, 'string');
              assert.equal(simpleStore.address, receipt.contractAddress);
              assert.equal(typeof simpleStore.set, 'function');
              assert.equal(typeof simpleStore.get, 'function');
              assert.equal(typeof simpleStore.SetComplete, 'function');

              const setCompleteEvent = simpleStore.SetComplete(); // eslint-disable-line
              setCompleteEvent.new({fromBlock: 'earliest', toBlock: 'latest'}, (setCompleteError, setCompleteResult) => { // eslint-disable-line
                assert.equal(setCompleteError, null);
                assert.equal(typeof setCompleteResult, 'object');
                assert.equal(setCompleteResult.toString(10) > 0, true);
              });
              setCompleteEvent.watch((err) => {
                assert.equal(typeof err, 'object');

                setCompleteEvent.uninstall((stopWatchingError) => {
                  assert.equal(stopWatchingError, null);

                  done();
                });
              });

              simpleStore.set(setNumberValue, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');
              });
            });
          }, 1500);
        });
      });
    });

    it('should use events properly', (done) => {
      // because test rpc was not funcitoning properly, I had to make another provider
      function FakeProvider() {
        const self = this;
        self.provider = new HttpProvider('http://localhost:5001');
      }

      FakeProvider.prototype.sendAsync = function sendAsync(payload, callback) {
        const self = this;
        const parsedPayload = payload;

        if (parsedPayload.method === 'eth_getFilterChanges') {
          self.provider.sendAsync(payload, () => {
            const fakeEventLog = {
              id: parsedPayload.id,
              jsonrpc: parsedPayload.jsonrpc,
              result: [{
                logIndex: '0x0',
                blockNumber: '0x1b4',
                blockHash: '0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d54',
                transactionHash: '0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dc23f',
                transactionIndex: '0x0',
                address: '0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d',
                data: '0x0000000000000000000000000000000000000000000000000000000000001194000000000000000000000000ca35b7d915458ef540ade6068dfe2f44e8fa733c',
                topics: ['0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5'],
              }],
            };

            callback(null, fakeEventLog);
          });
        } else {
          self.provider.sendAsync(payload, callback);
        }
      };

      const eth = new Eth(new FakeProvider());
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              assert.equal(typeof simpleStore.abi, 'object');
              assert.equal(typeof simpleStore.address, 'string');
              assert.equal(simpleStore.address, receipt.contractAddress);
              assert.equal(typeof simpleStore.set, 'function');
              assert.equal(typeof simpleStore.get, 'function');
              assert.equal(typeof simpleStore.SetComplete, 'function');

              const setCompleteEvent = simpleStore.SetComplete(); // eslint-disable-line
              setCompleteEvent.new({fromBlock: 'earliest', toBlock: 'latest'}, (setCompleteError, setCompleteResult) => { // eslint-disable-line
                assert.equal(setCompleteError, null);
                assert.equal(typeof setCompleteResult, 'object');
                assert.equal(setCompleteResult.toString(10) > 0, true);
              });
              setCompleteEvent.watch((err, result) => {
                assert.equal(err, null);
                assert.equal(typeof result, 'object');
                assert.equal(result[0].blockNumber.toString(10), '436');
                assert.equal(result[0].data._newValue.toString(10), 4500); // eslint-disable-line

                setCompleteEvent.uninstall((stopError, stopResult) => {
                  assert.equal(stopError, null);
                  assert.equal(typeof stopResult, 'boolean');

                  done();
                });
              });

              simpleStore.set(setNumberValue, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');
              });
            });
          }, 1500);
        });
      });
    });

    it('should handle invalid call data with callback error', (done) => {
      // because test rpc was not funcitoning properly, I had to make another provider
      function FakeProvider() {
        const self = this;
        self.provider = new HttpProvider('http://localhost:5001');
      }

      FakeProvider.prototype.sendAsync = function sendAsync(payload, callback) {
        const self = this;
        const parsedPayload = payload;

        if (parsedPayload.method === 'eth_call') {
          self.provider.sendAsync(payload, () => {
            const fakeEventLog = {
              id: parsedPayload.id,
              jsonrpc: parsedPayload.jsonrpc,
              result: '0xkfsdksdfkjfsdjk',
            };

            callback(null, fakeEventLog);
          });
        } else {
          self.provider.sendAsync(payload, callback);
        }
      };

      const eth = new Eth(new FakeProvider());
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              simpleStore.get((getError, getResult) => {
                assert.equal(typeof getError, 'object');
                assert.equal(getResult, null);

                done();
              });
            });
          }, 1500);
        });
      });
    });

    it('should handle error in callback', (done) => {
      // because test rpc was not funcitoning properly, I had to make another provider
      function FakeProvider() {
        const self = this;
        self.provider = new HttpProvider('http://localhost:5001');
      }

      FakeProvider.prototype.sendAsync = function sendAsync(payload, callback) {
        const self = this;
        const parsedPayload = payload;

        if (parsedPayload.method === 'eth_call') {
          self.provider.sendAsync(payload, () => {
            const fakeEventLog = {
              id: parsedPayload.id,
              jsonrpc: parsedPayload.jsonrpc,
              error: 'invalid stuff',
            };

            callback(null, fakeEventLog);
          });
        } else {
          self.provider.sendAsync(payload, callback);
        }
      };

      const eth = new Eth(new FakeProvider());
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new((newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');
              const simpleStore = SimpleStore.at(receipt.contractAddress);

              simpleStore.get((getError, getResult) => {
                assert.equal(typeof getError, 'object');
                assert.equal(getResult, null);

                done();
              });
            });
          }, 1500);
        });
      });
    });

    it('should construct properly with some overriding txObjects', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new({ from: accounts[3] }, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;

              const simpleStore = SimpleStore.at(receipt.contractAddress);

              simpleStore.set(setNumberValue, { from: accounts[6] }, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');

                setTimeout(() => {
                  eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
                    assert.equal(setTxReceiptError, null);
                    assert.equal(typeof setTxReceipt, 'object');

                    simpleStore.get({}, (getError, getResult) => {
                      assert.equal(getError, null);
                      assert.equal(typeof getResult, 'object');
                      assert.equal(getResult[0].toNumber(10), setNumberValue);
                      done();
                    });
                  });
                }, 300);
              });
            });
          }, 1500);
        });
      });
    });

    it('should construct properly with hexed bytecode', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '0x606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI);
        SimpleStore.new({
          from: accounts[0],
          data: SimpleStoreBytecode,
          gas: 300000,
        }, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;

              const simpleStore = SimpleStore.at(receipt.contractAddress);

              simpleStore.set(setNumberValue, {
                from: accounts[0],
                gas: 300000,
              }, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');

                setTimeout(() => {
                  eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
                    assert.equal(setTxReceiptError, null);
                    assert.equal(typeof setTxReceipt, 'object');

                    simpleStore.get((getError, getResult) => {
                      assert.equal(getError, null);
                      assert.equal(typeof getResult, 'object');
                      assert.equal(getResult[0].toNumber(10), setNumberValue);
                      done();
                    });
                  });
                }, 300);
              });
            });
          }, 1500);
        });
      });
    });

    it('should construct properly with no default tx bytecode', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI);
        SimpleStore.new({
          from: accounts[0],
          data: SimpleStoreBytecode,
          gas: 300000,
        }, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;

              const simpleStore = SimpleStore.at(receipt.contractAddress);

              simpleStore.set(setNumberValue, {
                from: accounts[0],
                gas: 300000,
              }, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');

                setTimeout(() => {
                  eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
                    assert.equal(setTxReceiptError, null);
                    assert.equal(typeof setTxReceipt, 'object');

                    simpleStore.get((getError, getResult) => {
                      assert.equal(getError, null);
                      assert.equal(typeof getResult, 'object');
                      assert.equal(getResult[0].toNumber(10), setNumberValue);
                      done();
                    });
                  });
                }, 300);
              });
            });
          }, 1500);
        });
      });
    });

    it('should construct properly with no default tx object', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000575b5b5b61010e8061001a6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode);
        SimpleStore.new({
          from: accounts[0],
          gas: 300000,
        }, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => {
            eth.getTransactionReceipt(newResult, (errorReceipt, receipt) => {
              assert.equal(errorReceipt, null);
              assert.equal(typeof receipt, 'object');
              assert.equal(typeof receipt.contractAddress, 'string');

              const setNumberValue = 4500;

              const simpleStore = SimpleStore.at(receipt.contractAddress);

              simpleStore.set(setNumberValue, {
                from: accounts[0],
                gas: 300000,
              }, (setError, setResult) => {
                assert.equal(setError, null);
                assert.equal(typeof setResult, 'string');

                setTimeout(() => {
                  eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
                    assert.equal(setTxReceiptError, null);
                    assert.equal(typeof setTxReceipt, 'object');

                    simpleStore.get((getError, getResult) => {
                      assert.equal(getError, null);
                      assert.equal(typeof getResult, 'object');
                      assert.equal(getResult[0].toNumber(10), setNumberValue);
                      done();
                    });
                  });
                }, 300);
              });
            });
          }, 1500);
        });
      });
    });

    it('should construct properly constructor params', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"someVal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_someVal","type":"uint256"},{"name":"_addresses","type":"address[]"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000576040516102e13803806102e1833981016040528080519060200190919080518201919060200150505b8160018190555080600290805190602001908280548282559060005260206000209081019282156100b9579160200282015b828111156100b85782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555091602001919060010190610064565b5b5090506100fc91905b808211156100f857600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016100c2565b5090565b50505b50505b6101d1806101106000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100595780636d4ce63c1461008c578063a55f8600146100af578063edf26d9b146100d2575b610000565b34610000576100746004808035906020019091905050610119565b60405180821515815260200191505060405180910390f35b3461000057610099610183565b6040518082815260200191505060405180910390f35b34610000576100bc61018e565b6040518082815260200191505060405180910390f35b34610000576100ed6004808035906020019091905050610194565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b90565b60015481565b600281815481101561000057906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const initalValue = 730483222;
        const initalAddreeArray = [accounts[3], accounts[2], accounts[1]];

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new(initalValue, initalAddreeArray, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
            const simpleStore = SimpleStore.at(setTxReceipt.contractAddress);

            simpleStore.addresses(0, (errorAddresses0, addressResult0) => {
              assert.equal(errorAddresses0, null);
              assert.equal(addressResult0[0], initalAddreeArray[0]);

              simpleStore.addresses(1, (errorAddresses1, addressResult1) => {
                assert.equal(errorAddresses1, null);
                assert.equal(addressResult1[0], initalAddreeArray[1]);

                simpleStore.addresses(2, (errorAddresses2, addressResult2) => {
                  assert.equal(errorAddresses2, null);
                  assert.equal(addressResult2[0], initalAddreeArray[2]);

                  simpleStore.someVal((someValueError, someValue) => {
                    assert.equal(someValueError, null);
                    assert.equal(someValue[0].toNumber(10), initalValue);

                    done();
                  });
                });
              });
            });
          }), 300);
        });
      });
    });

    it('should construct properly constructor params and overriding tx object', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"someVal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_someVal","type":"uint256"},{"name":"_addresses","type":"address[]"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
      const SimpleStoreBytecode = '606060405234610000576040516102e13803806102e1833981016040528080519060200190919080518201919060200150505b8160018190555080600290805190602001908280548282559060005260206000209081019282156100b9579160200282015b828111156100b85782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555091602001919060010190610064565b5b5090506100fc91905b808211156100f857600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016100c2565b5090565b50505b50505b6101d1806101106000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100595780636d4ce63c1461008c578063a55f8600146100af578063edf26d9b146100d2575b610000565b34610000576100746004808035906020019091905050610119565b60405180821515815260200191505060405180910390f35b3461000057610099610183565b6040518082815260200191505060405180910390f35b34610000576100bc61018e565b6040518082815260200191505060405180910390f35b34610000576100ed6004808035906020019091905050610194565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b90565b60015481565b600281815481101561000057906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const initalValue = 730483222;
        const initalAddreeArray = [accounts[3], accounts[2], accounts[1]];

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 300000,
        });
        SimpleStore.new(initalValue, initalAddreeArray, { from: accounts[3] }, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
            const simpleStore = SimpleStore.at(setTxReceipt.contractAddress);

            simpleStore.addresses(0, (errorAddresses0, addressResult0) => {
              assert.equal(errorAddresses0, null);
              assert.equal(addressResult0[0], initalAddreeArray[0]);

              simpleStore.addresses(1, (errorAddresses1, addressResult1) => {
                assert.equal(errorAddresses1, null);
                assert.equal(addressResult1[0], initalAddreeArray[1]);

                simpleStore.addresses(2, (errorAddresses2, addressResult2) => {
                  assert.equal(errorAddresses2, null);
                  assert.equal(addressResult2[0], initalAddreeArray[2]);

                  simpleStore.someVal((someValueError, someValue) => {
                    assert.equal(someValueError, null);
                    assert.equal(someValue[0].toNumber(10), initalValue);

                    done();
                  });
                });
              });
            });
          }), 300);
        });
      });
    });

    it('should handle multi-type set and multi-type return', (done) => {
      const eth = new Eth(provider);
      const contract = new EthContract(eth);

      assert.equal(typeof contract, 'function');

      const SimpleStoreABI = [{"constant":false,"inputs":[{"name":"_val1","type":"int256"},{"name":"_val2","type":"uint256"},{"name":"_val3","type":"address[]"},{"name":"_val4","type":"string"},{"name":"_val5","type":"uint8"},{"name":"_val6","type":"bytes32"},{"name":"_val7","type":"bytes"},{"name":"_val8","type":"bytes8"},{"name":"_val9","type":"int8"},{"name":"_val10","type":"int16"},{"name":"_val11","type":"uint256[]"}],"name":"multiTypeSet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"multiTypeReturn","outputs":[{"name":"_val1","type":"int256"},{"name":"_val2","type":"uint256"},{"name":"_val3","type":"address[]"},{"name":"_val4","type":"string"},{"name":"_val5","type":"uint8"},{"name":"_val6","type":"bytes32"},{"name":"_val7","type":"bytes"},{"name":"_val8","type":"bytes8"},{"name":"_val9","type":"int8"},{"name":"_val10","type":"int16"},{"name":"_val11","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_nick","type":"string"}],"name":"somePayableMethod","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"someVal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_someVal","type":"uint256"},{"name":"_addresses","type":"address[]"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}];  // eslint-disable-line
      const SimpleStoreBytecode = '60606040523461000057604051610cc5380380610cc5833981016040528080519060200190919080518201919060200150505b8160018190555080600290805190602001908280548282559060005260206000209081019282156100b9579160200282015b828111156100b85782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555091602001919060010190610064565b5b5090506100fc91905b808211156100f857600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016100c2565b5090565b50505b50505b610bb5806101106000396000f36060604052361561007b576000357c0100000000000000000000000000000000000000000000000000000000900480632c0e463c14610080578063572c66e3146101d957806360fe47b1146103825780636d4ce63c146103b5578063a4b0d121146103d8578063a55f86001461042a578063edf26d9b1461044d575b610000565b34610000576101d760048080359060200190919080359060200190919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803590602001909190803590602001909190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610494565b005b34610000576101e661081e565b604051808c81526020018b815260200180602001806020018a60ff16815260200189600019168152602001806020018877ffffffffffffffffffffffffffffffffffffffffffffffff191681526020018760000b81526020018660010b81526020018060200185810385528e8181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f15090500185810384528d8181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102d95780820380516001836020036101000a031916815260200191505b5085810383528a8181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103325780820380516001836020036101000a031916815260200191505b508581038252868181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f1509050019f5050505050505050505050505050505060405180910390f35b346100005761039d6004808035906020019091905050610af9565b60405180821515815260200191505060405180910390f35b34610000576103c2610b63565b6040518082815260200191505060405180910390f35b610428600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610b6e565b005b3461000057610437610b72565b6040518082815260200191505060405180910390f35b34610000576104686004808035906020019091905050610b78565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b8a600381905550896004819055508860059080519060200190828054828255906000526020600020908101928215610522579160200282015b828111156105215782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550916020019190600101906104cd565b5b50905061056591905b8082111561056157600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555060010161052b565b5090565b50508760069080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105b357805160ff19168380011785556105e1565b828001600101855582156105e1579182015b828111156105e05782518255916020019190600101906105c5565b5b50905061060691905b808211156106025760008160009055506001016105ea565b5090565b505086600760006101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000908102040217905550856008819055508460099080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061069857805160ff19168380011785556106c6565b828001600101855582156106c6579182015b828111156106c55782518255916020019190600101906106aa565b5b5090506106eb91905b808211156106e75760008160009055506001016106cf565b5090565b505083600a60006101000a81548167ffffffffffffffff021916908378010000000000000000000000000000000000000000000000009004021790555082600a60086101000a81548160ff02191690837f010000000000000000000000000000000000000000000000000000000000000090810204021790555081600a60096101000a81548161ffff02191690837e0100000000000000000000000000000000000000000000000000000000000090810204021790555080600b90805190602001908280548282559060005260206000209081019282156107e9579160200282015b828111156107e85782518255916020019190600101906107cd565b5b50905061080e91905b8082111561080a5760008160009055506001016107f2565b5090565b50505b5050505050505050505050565b600060006020604051908101604052806000815260200150602060405190810160405280600081526020015060006000602060405190810160405280600081526020015060006000600060206040519081016040528060008152602001506003549a50600454995060058054806020026020016040519081016040528092919081815260200182805480156108f257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116108be575b5050505050985060068054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561098f5780601f106109645761010080835404028352916020019161098f565b820191906000526020600020905b81548152906001019060200180831161097257829003601f168201915b50505050509750600760009054906101000a900460ff169650600854955060098054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a435780601f10610a1857610100808354040283529160200191610a43565b820191906000526020600020905b815481529060010190602001808311610a2657829003601f168201915b50505050509450600a60009054906101000a90047801000000000000000000000000000000000000000000000000029350600a60089054906101000a900460000b9250600a60099054906101000a900460010b9150600b805480602002602001604051908101604052809291908181526020018280548015610ae457602002820191906000526020600020905b815481526020019060010190808311610ad0575b505050505090505b909192939495969798999a565b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b90565b5b50565b60015481565b600281815481101561000057906000526020600020900160005b915054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156';

      eth.accounts((accountsError, accounts) => {
        assert.equal(accountsError, null);
        assert.equal(Array.isArray(accounts), true);

        const initalValue = 730483222;
        const initalAddreeArray = [accounts[3], accounts[2], accounts[1]];

        const SimpleStore = contract(SimpleStoreABI, SimpleStoreBytecode, {
          from: accounts[0],
          gas: 3000000,
        });
        SimpleStore.new(initalValue, initalAddreeArray, { from: accounts[3] }, (newError, newResult) => {
          assert.equal(newError, null);
          assert.equal(typeof newResult, 'string');

          setTimeout(() => eth.getTransactionReceipt(newResult, (setTxReceiptError, setTxReceipt) => {
            const simpleStore = SimpleStore.at(setTxReceipt.contractAddress);

            /*
            int _val1,
            uint _val2,
            address[] _val3,
            string _val4,
            uint8 _val5,
            bytes32 _val6,
            bytes _val7,
            bytes8 _val8,
            int8 _val9,
            int16 _val10,
            uint256[] _val11
            */

            const args = [453,
              new BN('289234972'),
              [accounts[4], accounts[2]],
              'some great string',
              55,
              '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad',
              '0x47173285a8d73bbfa254cb01fad3',
              '0x47173285a8d73b3d',
              2,
              12,
              [12342, 923849, new BN('249829233')],
              (multiSetTypeError, multiSetTypeResult) => {
                setTimeout(() => eth.getTransactionReceipt(multiSetTypeResult, (multiSetReceiptError, multiSetReceipt) => {
                  assert.equal(multiSetReceiptError, null);
                  assert.equal(typeof multiSetReceipt, 'object');

                  simpleStore.multiTypeReturn((multiReturnError, multiReturn) => {
                    assert.equal(multiReturnError, null);
                    assert.equal(typeof multiReturn, 'object');

                    assert.equal(multiReturn[0].toNumber(10), args[0]);
                    assert.equal(multiReturn[1].toNumber(10), args[1].toNumber(10));
                    assert.equal(multiReturn[2][0], args[2][0]);
                    assert.equal(multiReturn[2][1], args[2][1]);
                    assert.equal(multiReturn[3], args[3]);
                    assert.equal(multiReturn[4].toNumber(10), args[4]);
                    assert.equal(multiReturn[5], args[5]);
                    assert.equal(multiReturn[6], args[6]);
                    assert.equal(multiReturn[7], args[7]);
                    assert.equal(multiReturn[8].toNumber(10), args[8]);
                    assert.equal(multiReturn[9].toNumber(10), args[9]);
                    assert.equal(multiReturn[10][0].toNumber(10), args[10][0]);
                    assert.equal(multiReturn[10][1].toNumber(10), args[10][1]);
                    assert.equal(multiReturn[10][2].toNumber(10), args[10][2].toNumber(10));

                    done();
                  });
                }), 300);
              }];

            simpleStore.multiTypeSet.apply(simpleStore, args);
          }), 300);
        });
      });
    });

    it('should shutdown the server', (done) => {
      server.close();
      done();
    });
  });
});
