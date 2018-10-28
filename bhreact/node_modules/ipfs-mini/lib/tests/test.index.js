'use strict';

var assert = require('chai').assert;
var IPFS = require('../index.js');

describe('ipfs-mini', function () {
  describe('constructor', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });
      assert.equal(typeof ipfs.provider, 'object');
      assert.throws(function () {
        return IPFS({});
      }, Error); // eslint-disable-line
      done();
    });
  });

  describe('setProvider', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS();

      ipfs.setProvider({ host: 'something', port: 2001 });

      assert.equal(typeof ipfs.provider, 'object');
      assert.equal(ipfs.provider.host, 'something');
      assert.equal(ipfs.provider.port, 2001);
      assert.equal(ipfs.provider.protocol, 'http');
      assert.equal(ipfs.provider.base, '/api/v0');

      ipfs.setProvider({ host: 'something', protocol: 'https' });

      assert.equal(ipfs.provider.host, 'something');
      assert.equal(ipfs.provider.port, 5001);
      assert.equal(ipfs.provider.protocol, 'https');
      assert.equal(ipfs.provider.base, '/api/v0');

      done();
    });

    it('should throw when invalid', function () {
      var ipfs = new IPFS();

      assert.throws(function () {
        return ipfs.setProvider(2342353535);
      }, Error);
    });
  });

  describe('sendAsync', function () {
    it('should handle no callback', function () {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

      ipfs.sendAsync({ payload: '',
        uri: '/cat/QmXSVWNxQ9zBE6H3teHAHo5mCW8nkcNFaPkzBVFoCjKu1Q',
        accept: 'application/json' });
    });

    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

      ipfs.sendAsync({ payload: '',
        uri: '/cat/QmUGRRbGTMJsQ3ZFbsBJPN4a6bragAhUjakyoQ7B9uTcof',
        accept: 'application/json' }, function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'string');

        done();
      });
    });

    it('handle invalid request', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'http' });

      ipfs.sendAsync({ payload: '',
        uri: '/cat/QmXSVWNxQ9zBE6H3teHAHo5mCW8nkcNFaPkzBVFoCjKu1Q',
        accept: 'application/json' }, function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('handle invalid JSON parse', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

      ipfs.sendAsync({ payload: '',
        uri: '/cat/QmXSVWNxQ9zBE6H3teHAHo5mCW8nkcNFaPkzBVFoCjKu1Q',
        accept: 'application/json', jsonParse: true }, function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('handle invalid payload', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

      ipfs.sendAsync({ payload: ipfs.sendAsync,
        uri: '/cat/QmXSVWNxQ9zBE6H3teHAHo5mCW8nkcNFaPkzBVFoCjKu1Q',
        accept: 'application/json' }, function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('handle invalid payload with Null', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

      ipfs.sendAsync({ payload: null,
        uri: '/add',
        boundary: 'random-boundary',
        accept: 'application/json' }, function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('handle invalid payload with add', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      ipfs.sendAsync({ payload: 'QmXSVWNxQ9zBE6H3teHAHo5mCW8nkcNFaPkzBVFoCjKu1Q',
        uri: '/add',
        boundary: 'random-boundary',
        accept: 'application/json' }, function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });
  });

  describe('add', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      var testVal = 'hello world!';

      ipfs.add(testVal, function (err, ipfsHash) {
        assert.equal(err, null);
        assert.equal(typeof ipfsHash, 'string');
        assert.equal(ipfsHash, 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j');
        ipfs.cat(ipfsHash, function (catError, catResult) {
          assert.equal(catError, null);
          assert.equal(typeof catResult, 'string');
          assert.equal(catResult, testVal);

          done();
        });
      });
    });

    it('should add a JPEG buffer', function (done) {
      var jpgBuffer = new Buffer('ffd8ffe000104a46494600010101006000600000ffe1001645786966000049492a0008000000000000000000ffdb00430001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101ffdb00430101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101ffc00011080001000103012200021101031101ffc400150001010000000000000000000000000000000affc40014100100000000000000000000000000000000ffc40014010100000000000000000000000000000000ffc40014110100000000000000000000000000000000ffda000c03010002110311003f00bf8001ffd9', 'hex');
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https' });

      ipfs.add(jpgBuffer, function (addError, ipfsHash) {
        assert.equal(addError, null);
        assert.equal(typeof ipfsHash, 'string');
        assert.equal(ipfsHash, 'Qmec2nQNR53bP8MgA8ykxabAA1aQ21T9GZ8dbrwvMTMbJf');

        done();
      });
    });
  });

  describe('stat', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      var testVal = { hello: 'world!!!' };

      ipfs.addJSON(testVal, function (err, ipfsHash) {
        assert.equal(err, null);
        assert.equal(typeof ipfsHash, 'string');

        ipfs.catJSON(ipfsHash, function (catError, catResult) {
          assert.equal(catError, null);
          assert.equal(typeof catResult, 'object');
          assert.deepEqual(catResult, testVal);

          ipfs.stat(ipfsHash, function (statError, statResult) {
            assert.equal(statError, null);
            assert.equal(typeof statResult, 'object');

            done();
          });
        });
      });
    });
  });

  describe('addJSON', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      var testVal = { hello: 'world!!!' };

      ipfs.addJSON(testVal, function (err, ipfsHash) {
        assert.equal(err, null);
        assert.equal(typeof ipfsHash, 'string');
        assert.equal(ipfsHash, 'QmUGRRbGTMJsQ3ZFbsBJPN4a6bragAhUjakyoQ7B9uTcof');
        ipfs.catJSON(ipfsHash, function (catError, catResult) {
          assert.equal(catError, null);
          assert.equal(typeof catResult, 'object');
          assert.deepEqual(catResult, testVal);

          done();
        });
      });
    });
  });

  describe('cat', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      ipfs.cat('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j', function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'string');

        done();
      });
    });
  });

  describe('catJSON', function () {
    it('should function normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      ipfs.catJSON('QmUGRRbGTMJsQ3ZFbsBJPN4a6bragAhUjakyoQ7B9uTcof', function (err, result) {
        assert.equal(err, null);
        assert.equal(typeof result, 'object');

        done();
      });
    });

    it('should handle invalid data call', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'http', port: '5001' });

      ipfs.catJSON('QmUGRRbGTMJsQ3ZFbsBJPN4a6bragAhUjakyoQ7B9uTcof', function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });

    it('should handle invalid JSON data normally', function (done) {
      var ipfs = new IPFS({ host: 'ipfs.infura.io', protocol: 'https', port: '5001' });

      ipfs.catJSON('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j', function (err, result) {
        assert.equal(typeof err, 'object');
        assert.equal(result, null);

        done();
      });
    });
  });
});