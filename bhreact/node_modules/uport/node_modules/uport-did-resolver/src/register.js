import { registerMethod } from 'did-resolver'
import UportLite from 'uport-lite'

export function convertToDid (did, legacy) {
  const publicKey = [{
    id: `${did}#keys-1`,
    type: 'Secp256k1VerificationKey2018',
    owner: did,
    publicKeyHex: legacy.publicKey.match(/^0x/) ? legacy.publicKey.slice(2) : legacy.publicKey
  }]
  
  const authentication = [{
    type: 'Secp256k1SignatureAuthentication2018',
    publicKey: `${did}#keys-1`
  }]

  if (legacy.publicEncKey) {
    publicKey.push({
      id: `${did}#keys-2`,
      type: 'Curve25519EncryptionPublicKey',
      owner: did,
      publicKeyBase64: legacy.publicEncKey
    })
  }
  const doc = {
    '@context': 'https://w3id.org/did/v1',
    id: did,
    publicKey,
    authentication
  }
  if (legacy.name || legacy.description || legacy.image) {
    const profile = Object.assign({}, legacy)
    delete profile['publicKey']
    delete profile['publicEncKey']
    doc.uportProfile = profile
  }
  return doc
}

function register (configured) {
  const cpsRegistry = configured || UportLite()

  const registry = mnid => new Promise((resolve, reject) => {
    cpsRegistry(mnid, (error, doc) => error ? reject(error) : resolve(doc))
  })

  function resolve (did, parsed) {
    return new Promise((resolve, reject) => {
      registry(parsed.id).then(doc => {
        if (!doc) return resolve()
        // Check if real DID document or legacy
        if (doc['@context'] === 'https://w3id.org/did/v1') return resolve(doc)
        if (typeof doc['publicKey'] === 'string') {
          return resolve(convertToDid(did, doc))
        }
      }, reject)
    })
  }

  registerMethod('uport', resolve)
}

module.exports = register
