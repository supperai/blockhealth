import { registerMethod } from 'did-resolver'
import { ethLookup, ipfsLookup } from './lookup'


function register (opts = {}) {

  async function resolve (did, parsed) {
    let doc = await fetchMuPortDoc(parsed.id, opts.ipfsConf)
    const newHash = await ethLookup(doc.managementKey, opts.rpcProviderUrl)
    if (newHash) {
      doc = await fetchMuPortDoc(newHash, opts.ipfsConf)
    }
    return wrapDocument(did, doc)
  }
  registerMethod('muport', resolve)
}

async function fetchMuPortDoc (ipfsHash, ipfsConf) {
  let doc
  try {
    doc = await ipfsLookup(ipfsHash, ipfsConf)
  } catch (e) {}
  if (!doc || !doc.signingKey) throw new Error('Invalid muport did')
  return doc
}

function wrapDocument (did, muportDocument) {
  if (muportDocument.version !== 1) throw new Error('Unsupported muportDocument version')
  let doc = {
    "@context": "https://w3id.org/did/v1",
    "id": did,
    "publicKey": [{
      "id": did + "#signingKey",
      "type": "Secp256k1VerificationKey2018",
      "owner": did,
      "publicKeyHex": muportDocument.signingKey
    }, {
      "id": did + "#managementKey",
      "type": "Secp256k1VerificationKey2018",
      "owner": did,
    }, {
      "id": did + "#encryptionKey",
      "type": "Curve25519EncryptionPublicKey",
      "owner": did,
      "publicKeyBase64": muportDocument.asymEncryptionKey
    }],
    "authentication": [{
      "type": "Secp256k1SignatureAuthentication2018",
      "publicKey": did + "#signingKey"
    }],
    "muportData": {}
  }
  if (muportDocument.managementKey.length === 42) {
    doc.publicKey[1].ethereumAddress = muportDocument.managementKey
  } else {
    doc.publicKey[1].publicKeyHex = muportDocument.managementKey
  }
  if (muportDocument.publicProfile) doc.uportProfile = muportDocument.publicProfile
  if (muportDocument.symEncryptedData) doc.muportData.symEncryptedData = muportDocument.symEncryptedData
  if (muportDocument.recoveryNetwork) doc.muportData.recoveryNetwork = muportDocument.recoveryNetwork
  return doc
}

module.exports = register
