import resolve from 'did-resolver'
import register from '../register'

describe('uportResolver', () => {
  describe('resolve', () => {
    const docPerson = {
      '@context': 'https://w3id.org/did/v1',
      'id': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
      'publicKey': [{
        'id': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#keys-1',
        'type': 'Secp256k1VerificationKey2018',
        'owner': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        'publicKeyHex': '04613bb3a4874d27032618f020614c21cbe4c4e4781687525f6674089f9bd3d6c7f6eb13569053d31715a3ba32e0b791b97922af6387f087d6b5548c06944ab062'
      }, {
        'id': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#keys-2',
        'type': 'Curve25519EncryptionPublicKey',
        'owner': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        'publicKeyBase64': 'QCFPBLm5pwmuTOu+haxv0+Vpmr6Rrz/DEEvbcjktQnQ='
      }],
      'authentication': [{
        'type': 'Secp256k1SignatureAuthentication2018',
        'publicKey': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#keys-1'
      }]
    }

    const legacyPerson = {
      '@context': 'http://schema.org',
      '@type': 'Person',
      'publicKey': '0x04613bb3a4874d27032618f020614c21cbe4c4e4781687525f6674089f9bd3d6c7f6eb13569053d31715a3ba32e0b791b97922af6387f087d6b5548c06944ab062',
      'publicEncKey': 'QCFPBLm5pwmuTOu+haxv0+Vpmr6Rrz/DEEvbcjktQnQ='
    }

    const docApp = {
      '@context': 'https://w3id.org/did/v1',
      'id': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
      'publicKey': [{
        'id': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#keys-1',
        'type': 'Secp256k1VerificationKey2018',
        'owner': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX',
        'publicKeyHex': '04613bb3a4874d27032618f020614c21cbe4c4e4781687525f6674089f9bd3d6c7f6eb13569053d31715a3ba32e0b791b97922af6387f087d6b5548c06944ab062'
      }],
      'uportProfile': {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        'name': 'uPort @ Devcon 3',
        'description': 'Uport Attestations',
        'image': {'@type': 'ImageObject', 'name': 'avatar', 'contentUrl': '/ipfs/QmSCnmXC91Arz2gj934Ce4DeR7d9fULWRepjzGMX6SSazB'}
      },
      'authentication': [{
        'type': 'Secp256k1SignatureAuthentication2018',
        'publicKey': 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#keys-1'
      }]
    }

    const legacyApp = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      'name': 'uPort @ Devcon 3',
      'description': 'Uport Attestations',
      'publicKey': '0x04613bb3a4874d27032618f020614c21cbe4c4e4781687525f6674089f9bd3d6c7f6eb13569053d31715a3ba32e0b791b97922af6387f087d6b5548c06944ab062',
      'image': {'@type': 'ImageObject', 'name': 'avatar', 'contentUrl': '/ipfs/QmSCnmXC91Arz2gj934Ce4DeR7d9fULWRepjzGMX6SSazB'}
    }

    describe('valid DID docs', () => {
      it('resolves document', async () => {
        register((mnid, cb) => cb(null, docPerson))
        await expect(resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).resolves.toEqual(docPerson)
      })
    })

    describe('legacy identity docs', () => {
      it('resolves and converts document with encryption key', async () => {
        register((mnid, cb) => cb(null, legacyPerson))
        await expect(resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).resolves.toEqual(docPerson)
      })
      it('resolves and converts document with spp profile', async () => {
        register((mnid, cb) => cb(null, legacyApp))
        await expect(resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).resolves.toEqual(docApp)
      })
    })

    describe('doc not found', () => {
      it('resolves and returns null', async () => {
        register((mnid, cb) => cb(null, null))
        await expect(resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).resolves.toBeUndefined()
      })
    })

    describe('error handling', () => {
      it('rejects promise', async () => {
        register((mnid, cb) => {
          cb(new Error('stuff happened'), null)
        })
        expect(resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).rejects.toEqual(new Error('stuff happened'))
      })
    })
  })
})
