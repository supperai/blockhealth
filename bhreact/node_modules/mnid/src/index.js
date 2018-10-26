var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var base58 = require('base-x')(BASE58)
var hex = require('base-x')('0123456789abcdef')

import { sha3_256 } from 'js-sha3'
import { Buffer } from 'buffer'

function checksum (payload) {
  return new Buffer(sha3_256(Buffer.concat(payload)), 'hex').slice(0, 4)
}

export function encode ({network, address}) {
  const payload = [new Buffer('01', 'hex'), hex.decode(network.slice(2)), new Buffer(address.slice(2), 'hex')]
  payload.push(checksum(payload))
  return base58.encode(Buffer.concat(payload))
}

export function decode (encoded) {
  const data = Buffer.from(base58.decode(encoded))
  const netLength = data.length - 24
  const version = data.slice(0, 1)
  const network = data.slice(1, netLength)
  const address = data.slice(netLength, 20 + netLength)
  const check = data.slice(netLength + 20)
  if (check.equals(checksum([version, network, address]))) {
    return {
      network: `0x${hex.encode(network)}`,
      address: `0x${address.toString('hex')}`
    }
  } else {
    throw new Error('Invalid address checksum')
  }
}

export function isMNID (encoded) {
  try {
    const data = Buffer.from(base58.decode(encoded))
    return data.length > 24 && data[0] === 1
  } catch (e) {
    return false
  }
}