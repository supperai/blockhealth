# µPort DID Resolver

This library is intended to resolve µPort DID documents. µPort is a thin identity protocol that uses ipfs and ethereum to publish and rotate the cryptographic keys used by an identity. Currently it only supports creating and resolving identities, but not updating them.

It supports the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec from the [W3C Credentials Community Group](https://w3c-ccg.github.io).

It requires the `did-resolver` library, which is the primary interface for resolving DIDs.

## Resolving a DID document

The resolver presents a simple `resolver()` function that returns a ES6 Promise returning the DID document.

```js
import resolve from 'did-resolver'
import registerResolver from 'muport-did-resolver'

registerResolver()

resolve('did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV').then(doc => console.log)

// You can also use ES7 async/await syntax
const doc = await resolve('did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV')
```
Result:
```js
{ '@context': 'https://w3id.org/did/v1',
  id: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV',
  publicKey:
   [ { id: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV#signingKey',
       type: 'Secp256k1VerificationKey2018',
       owner: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV',
       publicKeyHex: '02756bca1edf0d0e263851b95e7963b4721d82c2e84c9d7f8a380f899dff8f721c' },
     { id: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV#managementKey',
       type: 'Secp256k1VerificationKey2018',
       owner: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV',
       publicKeyHex: '0214ca1c21dfa6bb2550a8559e83817ebd82cfbb8dbda56757f4c0517dde9c52ff' },
     { id: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV#encryptionKey',
       type: 'Curve25519EncryptionPublicKey',
       owner: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV',
       publicKeyBase64: 'uYGr6nD/c/2hQ3hNFrWUWAdlNoelPqduYyyafrALf2U=' } ],
  authentication:
   [ { type: 'Secp256k1SignatureAuthentication2018',
       publicKey: 'did:muport:QmRhjfL4HLdB8LovGf1o43NJ8QnbfqmpdnTuBvZTewnuBV#signingKey' } ],
  muportData: { nym: 'lala', symEncryptedData: {} } }
```

