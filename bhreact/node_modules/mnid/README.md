# Multi Network Identifier (MNID)

Ethereum and uPort is headed into a multi-chain world. As end users are are interacting more and more with Ethereum and multiple chains the risk of monetary loss of users/servers inadvertently transferring value from an address on network X to an address of Y is growing higher and higher.

The Bitcoin protocol uses [Base58Check encoding](https://en.bitcoin.it/wiki/Base58Check_encoding) to prevent this, but the ethereum ecosystem has used a raw hex version of the address instead.

As uPort is switching networks and is planning on living in a primarily multi network world we need to solve this issue urgently.

## Extendible Encoding

My proposal is inspired by the Base58Check encoding as well as [EIP77](https://github.com/ethereum/EIPs/issues/77) but specifies adds a network identifier, which allows us to programmatically extract the network used by an address as well as provide a visual indicator of the network used.

The following items are encoded:

* 1 byte version number currently `1`
* network id or four bytes of genesis block hash (or both)
* actual address data
* Four bytes (32 bits) of SHA3-based error checking code (digest of the version, network and payload)

Then use base58 encoding of the end result. The end result is fairly complete but still extendible in the future. We could start using simply the network id and replace it with with genesis block hash and other meta data in the future.

### Benefits

This works with ethereum based blockchains, but can easily be extended to use other blockchains or even non blockchain identifiers in the future. It would also be straightforward to add further details specifying which fork etc.

### Ease of Implementation

This can be implemented very easily with few dependencies. It would be trivial to use this to add multichain support to uport-lite for example. Thus even allowing (if we want it) the interchange of JWT's verified on different networks.

### Examples

The following Ethereum hex encoded address `0x00521965e7bd230323c423d96c657db5b79d099f` could be encoded as follows


* main-net: `2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX`
* ropsten: `2oDZvNUgn77w2BKTkd9qKpMeUo8EL94QL5V`
* kovan: `34ukSmiK1oA1C5Du8aWpkjFGALoH7nsHeDX`
* infuranet: `9Xy8yQpdeCNSPGQ9jwTha9MRSb2QJ8HYzf1u`

### Future additions

It would be trivial to add shard ids, fork descriptors (block number and hash) etc to the address. It would also be trivial to encode other kinds of identities that don't correspond directly to an address on a chain.

## Javascript reference implementation

```js
> var mnid = require('mnid')
> mnid.encode({
  network: '0x1', // the hex encoded network id or for private chains the hex encoded first 4 bytes of the genesis hash
  address: '0x00521965e7bd230323c423d96c657db5b79d099f'
})
'2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX'

> mnid.decode('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')
{ network: '0x1', 
  address: '0x00521965e7bd230323c423d96c657db5b79d099f' }

// Check if string is a valid MNID

> mnid.isMNID('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')
true

> mnid.isMNID('0x00521965e7bd230323c423d96c657db5b79d099f')
false

> mnid.isMNID('1GbVUSW5WJmRCpaCJ4hanUny77oDaWW4to')
false

> mnid.isMNID('QmXuNqXmrkxs4WhTDC2GCnXEep4LUD87bu97LQMn1rkxmQ')
false
```

## Inspirations

### Base58Check Encoding

Bitcoin's encoding consists of the following 3 items:

* Version prefix - Used more as a type and network field. See [list](https://en.bitcoin.it/wiki/List_of_address_prefixes).
* Payload (eg. hash of public key)
* Four bytes (32 bits) of SHA256-based error checking code (digest of the version and payload)

The whole thing is base58 encoded for compactness and URL safety.

The version prefix allows humans to visually recognize the address type from the first couple of characters. The error checking code ensures that there aren't any obvious errors in hte address

### EIP77 

A previous attempt at solving this for ethereum is found in [EIP 77](https://github.com/ethereum/EIPs/issues/77) which is similar to Base58Check:

* 1 flag byte - currently undefined. I suppose this could be used to pick a chain. But 1 byte does not seem enough
* Payload (eg. hash of public key)
* Four bytes (32 bits) of  SHA3-based error error checking code (digest of the version and payload)

## 


