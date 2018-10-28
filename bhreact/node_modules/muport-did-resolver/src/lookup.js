import bs58 from 'bs58'
import { ec as EC } from 'elliptic'
import { keccak_256 } from 'js-sha3'

const XMLHttpRequest = (typeof window !== 'undefined') ? window.XMLHttpRequest : require('xmlhttprequest').XMLHttpRequest
const secp256k1 = new EC('secp256k1')

const PROVIDER_URL = 'https://mainnet.infura.io'
const IPFS_CONF = { host: 'ipfs.infura.io', port: 5001, protocol: 'https' }
const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

async function ipfsLookup (hash, conf) {
  conf = conf || IPFS_CONF
  const url = conf.protocol + '://' + conf.host + '/ipfs/' + hash
  return request(url)
}

async function ethLookup (managementKey, rpcUrl = PROVIDER_URL) {
  // registry should always be deployed to this address
  const registryAddress = '0x37c3719cdabd54e6b5195e366f9ef8fc59a509e3'
  const address = managementKey.length === 42 ? managementKey.slice(2) : toEthereumAddress(managementKey)
  const callData = createCallData(address)
  const hexHash = (await request(rpcUrl, JSON.stringify({
      method: 'eth_call',
      params: [ {to: registryAddress, data: callData}, 'latest' ],
      id: 1,
      jsonrpc: '2.0'
    })
  )).result
  return hexHash === ZERO_HASH ? null : hexToIpfsHash(hexHash)
}

const hexToIpfsHash = hexHash => bs58.encode(Buffer.from('1220' + hexHash.slice(2), 'hex'))
// a method call to 'lookup' with the claim key 'muPortDocumentIPFS1220'
const createCallData = addr => '0x5dd4a65f000000000000000000000000' + addr + '6d75506f7274446f63756d656e74495046533132323000000000000000000000'

function request (url, payload) {
  const request = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.timeout !== 1) {
        if (request.status !== 200) {
          reject(`[muport-did-resolver] status ${request.status}: ${request.responseText}`)
        } else {
          try {
            resolve(JSON.parse(request.responseText))
          } catch (jsonError) {
            reject(`[muport-did-resolver] while parsing data: '${String(request.responseText)}', error: ${String(jsonError)}`)
          }
        }
      }
    }
    if (payload) {
      request.open('POST', url)
      request.setRequestHeader('Content-Type', `application/json`)
    } else {
      request.open('GET', url)
    }
    request.setRequestHeader('accept', 'application/json')
    request.send(payload)
  })
}

const keccak = data => Buffer.from(keccak_256.buffer(data))
const decompressPubKey = key => secp256k1.keyFromPublic(key, 'hex').pub.encode('hex')
const toEthereumAddress = pubkey => keccak(Buffer.from(decompressPubKey(pubkey).slice(2), 'hex')).slice(-20).toString('hex')

module.exports = { ethLookup, ipfsLookup }
